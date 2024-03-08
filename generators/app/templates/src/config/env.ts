import { merge } from 'lodash';

import defaultJson from './default';

const mergedConf: {
  defaultDirectPath: string;
  request: {
    globalParams: string[];
    prefix: string;
    prefixes: Record<string, string>;
  };
} = merge(defaultJson, {
  request: {
    prefix: import.meta.env.VITE_REQUEST_PREFIX
  }
});

export const IS_DEVELOPMENT = import.meta.env.DEV;

export default mergedConf;
