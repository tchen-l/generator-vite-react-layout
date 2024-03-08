import { HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';

const menus: MenuDataItem[] = [
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined />
  },
  {
    name: '欢迎-分组',
    icon: <SmileOutlined />,
    children: [
      {
        name: '欢迎',
        path: '/hello-world',
        hideChildrenInMenu: true,
        children: [
          {
            name: '欢迎欢迎',
            path: '/hello-world-child'
          }
        ]
      }
    ]
  }
];

export default menus;
