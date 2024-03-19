import { LogoutOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { NavLink, Outlet } from 'react-router-dom';

import menus from '@/router/menus';
import useAppStore from '@/store/app';

export default function BasicLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const appStore = useAppStore();

  return (
    <ProLayout
      layout="mix"
      location={{
        pathname
      }}
      menu={{
        collapsedShowGroupTitle: true
      }}
      route={{
        routes: menus
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      menuItemRender={(item, defaultDom) => {
        return <NavLink to={item.path!}>{defaultDom}</NavLink>;
      }}
      fixedHeader
      fixSiderbar
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitleRender={(logo, title) => {
        return (
          <NavLink to="/">
            {logo}
            {title}
          </NavLink>
        );
      }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: appStore.currentUser?.name,
        render: (_, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: () => {
                      navigate('/login');
                      appStore.reset();
                    }
                  }
                ]
              }}
            >
              {dom}
            </Dropdown>
          );
        }
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
