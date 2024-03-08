/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 请求前缀 */
  readonly VITE_REQUEST_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
