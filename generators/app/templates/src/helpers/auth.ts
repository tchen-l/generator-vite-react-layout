import { matchPath } from 'react-router';

/**
 * 是否无需登录页面
 */
export const isOpenPage = (pathname: string) =>
  ['/login'].some((path) => !!matchPath({ path, caseSensitive: true }, pathname));
