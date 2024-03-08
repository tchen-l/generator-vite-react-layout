import { useEffect, useRef } from 'react';

import { STORAGE_TOKEN_KEY } from '@/constant/storage';

/**
 * 监听 localStorage 变化
 */
export default function useStorageChange(
  callback: (e: StorageEvent) => void,
  { listenedKey }: { listenedKey: string }
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const storageListener = (e: StorageEvent) => {
      if ([undefined, null, ''].includes(listenedKey)) {
        callbackRef.current?.(e);
        return;
      }
      if (e.key === listenedKey) {
        callbackRef.current?.(e);
      }
    };

    window.addEventListener('storage', storageListener);

    return () => window.removeEventListener('storage', storageListener);
  }, [listenedKey]);
}

/**
 * token变化后刷新页面
 */
export function useReloadWhenTokenChange(tokenKey = STORAGE_TOKEN_KEY) {
  useStorageChange(
    () => {
      window.location.reload();
    },
    { listenedKey: tokenKey }
  );
}
