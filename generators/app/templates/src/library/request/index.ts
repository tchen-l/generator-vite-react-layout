import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { isNumber } from 'lodash';

import conf from '@/config/env';
import { deleteAuthAndToken, getByKey, getToken } from '@/helpers/storage';
import useAppStore from '@/store/app';

const service = axios.create({
  baseURL: conf.request.prefix,
  headers: {
    'Content-Type': 'application/json'
  }
});

const filterErrorUrl = [
  '/v1/download-tasks/count',
  '/v1/recheck-tasks/subtask-page',
  '/v1/appeal-tasks/query-b-user',
  '/v1/todo-task'
];

function buildGlobalParams(ignoreGlobalParams: string[] = []) {
  // 通过设置globalRequestKeys，可以选择不同的全局参数
  const globalRequestKeys: string[] = conf.request.globalParams;
  const globalParams: Record<string, string> = globalRequestKeys?.reduce?.((acc, key) => {
    if (!ignoreGlobalParams.includes(key)) {
      acc[key] = getByKey(key, window.localStorage);
    }
    return acc;
  }, {} as Record<string, string>);

  return globalParams;
}

const AT_PREFIX_REGEX = /^@([^/]+)/;

// should parse filename from response Headers, if the request body includes these fields
const needFilenameFields = ['filePath', 'fileInfo'];

const parseFilenameFormHeader = (headers: AxiosResponse['headers']) => {
  if (!headers['content-disposition']) return undefined;
  return (headers['content-disposition'].match(/filename=(.*)/) || [])[1];
};

// 响应拦截器, 会在此添加通知事件响应
service.interceptors.request.use(
  (originConfig) => {
    const config = { ...originConfig };
    let url = config?.url || '';
    const matches = url?.match(AT_PREFIX_REGEX);
    if (matches) {
      const [, atPrefix] = matches;
      const prefix = conf.request.prefixes[atPrefix];
      url = url?.replace(AT_PREFIX_REGEX, prefix);
    }

    const globalParams = buildGlobalParams();
    // fill for request body or query parameter.
    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
      if (Array.isArray(config.data)) {
        // if root object is array
        config.data = config.data.map((item) => {
          if (typeof item === 'object' && !Array.isArray(item)) {
            return {
              ...globalParams,
              ...item
            };
          }
          return item;
        });
      } else {
        config.data = {
          ...globalParams,
          ...config.data
        };
      }
    }

    // fill in placeholders for path parameters
    Object.entries(globalParams).forEach(([key, value]) => {
      const placeholder = `:${key}`;
      if (value != null && url?.indexOf(placeholder) >= 0) {
        url = url?.replace(placeholder, value);
      }
    });

    // fill in query string
    const queryIndex = url?.indexOf('?');
    const urlSearchParams = new URLSearchParams(queryIndex > 0 ? url?.substring(queryIndex) : '');
    Object.entries(globalParams).forEach(([key, value]) => {
      // only when the param doesn't exist in url or param is null, set it with the global param.
      if (!urlSearchParams.get(key) && !config?.params?.[key]) {
        urlSearchParams.set(key, value);
      }
    });

    let qs = urlSearchParams.toString();
    if (qs) {
      qs = `?${qs}`;
    }

    config.url = url.split('?')[0] + qs;

    config.headers['YuYi-Token'] = getToken() as string;
    config.headers.companyId = globalParams?.companyId;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  async (response) => {
    // TODO: IF NOT SUCCESS, NOTICE TO THE NOTICE BOX AND RETURN THE RES.
    const res = response.data;
    const { code } = res || {};

    const is400to599 = isNumber(code) && code >= 400 && code <= 599;

    if (code === 401) {
      deleteAuthAndToken();
      useAppStore.getState().reset();
      window.location.href = '/login';
      return res;
    }

    if (is400to599) {
      message.error('服务器开小差啦，请稍候再试！');
    }

    // 针对文件下载, 解析 response Headers 里的 filename. 放在 downloadFilename 字段返回给组件
    if (needFilenameFields.some((i) => response.config.data?.includes?.(i))) {
      const filename = parseFilenameFormHeader(response.headers);
      res.downloadFilename = filename;
      return res;
    }

    return res;
  },
  async (error) => {
    const { response, config } = error || {};

    if (!filterErrorUrl.some((item) => config?.url?.includes(item))) {
      message.error('服务器开小差啦，请稍候再试！');
    }

    if (response?.status === 401) {
      deleteAuthAndToken();
      useAppStore.getState().reset();
      window.location.href = '/login';

      return Promise.resolve({
        error,
        success: false
      });
    }

    return Promise.resolve({
      error,
      success: false
    });
  }
);

export default service;
