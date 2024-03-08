import { PageContainer } from '@ant-design/pro-components';
import { NavLink } from 'react-router-dom';

export default function HelloWorld() {
  return (
    <PageContainer>
      <NavLink to="/hello-world-child">child</NavLink>
      <br />
      <NavLink to="/">go home</NavLink>
    </PageContainer>
  );
}
