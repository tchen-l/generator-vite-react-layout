import { RouteObject } from 'react-router-dom';

import { RootErrorBoundary } from '@/components';
import Layout from '@/layout';

const lazy = (src: string) => async () => {
  const { default: Component } = await import(src);
  return {
    Component
  };
};

const routes: RouteObject[] = [
  {
    Component: Layout,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: '/',
        lazy: lazy('../pages/home')
      },
      {
        path: '/hello-world',
        lazy: lazy('../pages/hello-world'),
        caseSensitive: true
      },
      {
        path: '/hello-world-child',
        lazy: lazy('../pages/hello-world/hello-world-child'),
        caseSensitive: true
      },
      {
        path: '/login',
        caseSensitive: true,
        lazy: lazy('../pages/login')
      }
    ]
  },
  {
    path: '*',
    lazy: lazy('../pages/no-match')
  }
];

export default routes;
