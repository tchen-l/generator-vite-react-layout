import { PageContainer } from '@ant-design/pro-components';
import { NavLink } from 'react-router-dom';

export default function HelloWorldChild() {
  return (
    <PageContainer>
      <NavLink to="/hello-world">up</NavLink>
    </PageContainer>
  );
}
