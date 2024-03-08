import { Button } from 'antd';
import { useNavigate } from 'react-router';

import useAppStore from '@/store/app';

export default function Login() {
  const navigate = useNavigate();
  const appStore = useAppStore();

  return (
    <Button
      onClick={() => {
        appStore.setToken('token');
        navigate('/');
      }}
    >
      login
    </Button>
  );
}
