import { Button, Result, Spin } from 'antd';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { isOpenPage } from '@/helpers/auth';
import useAppStore from '@/store/app';

import BasicLayout from './BasicLayout';
import BlankLayout from './BlankLayout';

const isBlankLayout = (route?: { layout: string } | undefined) => route?.layout === 'blank';

function InitDataLayout() {
  const { loading, currentUser, init } = useAppStore();
  const navigate = useNavigate();

  /** do something yourself */
  const canAccess = true;

  useEffect(() => {
    init();
  }, [init]);

  if (loading || !currentUser) {
    return <Spin spinning fullscreen tip="努力加载数据中..." />;
  }

  if (!canAccess) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    );
  }

  return isBlankLayout() ? <BlankLayout /> : <BasicLayout />;
}

export default function Layout() {
  const { pathname } = useLocation();

  const appStore = useAppStore();

  if (isOpenPage(pathname)) {
    return <BlankLayout />;
  }

  if (!appStore.token) {
    return <Navigate to="/login" />;
  }

  return <InitDataLayout />;
}
