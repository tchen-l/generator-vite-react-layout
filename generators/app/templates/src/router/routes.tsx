import { RouteObject } from 'react-router-dom';

import { RootErrorBoundary } from '@/components';
import lazy from '@/helpers/lazy';
import Layout from '@/layout';

const Home = lazy(() => import('../pages/home'));
const HelloWord = lazy(() => import('../pages/hello-world'));
const HelloWordChild = lazy(() => import('../pages/hello-world/hello-world-child'));
const Blank = lazy(() => import('../pages/blank'));
const Login = lazy(() => import('../pages/login'));
const NoMatch = lazy(() => import('../pages/no-match'));

const routes: RouteObject[] = [
  {
    Component: Layout,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: '/',
        Component: Home
      },
      {
        path: '/hello-world',
        Component: HelloWord,
        caseSensitive: true
      },
      {
        path: '/hello-world-child',
        Component: HelloWordChild,
        caseSensitive: true
      },
      {
        path: '/blank',
        Component: Blank,
        caseSensitive: true
      },
      {
        path: '/login',
        caseSensitive: true,
        Component: Login
      }
    ]
  },
  {
    path: '*',
    Component: NoMatch
  }
];

export default routes;
