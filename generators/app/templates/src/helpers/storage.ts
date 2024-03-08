import { STORAGE_TOKEN_KEY } from '@/constant/storage';

export const getByKey = <D = unknown>(
  key: string,
  defaultStore: Storage = window.sessionStorage
): D => defaultStore.getItem(key) && JSON.parse(defaultStore.getItem(key)!);

export const setByKey = <D = unknown>(
  key: string,
  value: D,
  defaultStore: Storage = window.sessionStorage || {}
) => {
  defaultStore.setItem(key, JSON.stringify(value));
};

export const setToken = (token: string) => window.localStorage.setItem(STORAGE_TOKEN_KEY, token);

export const getToken = () => window.localStorage.getItem(STORAGE_TOKEN_KEY);

export const deleteAuthAndToken = () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  // 手动设置token为空是为了触发 useReloadWhenTokenChange
  setToken('');
};
