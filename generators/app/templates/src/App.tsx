import { ProConfigProvider } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useReloadWhenTokenChange } from './hooks/useStorageChange';
import routes from './router/routes';

const router = createBrowserRouter(routes);

function App() {
  useReloadWhenTokenChange();

  return (
    <ProConfigProvider hashed={false}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </ProConfigProvider>
  );
}

export default App;
