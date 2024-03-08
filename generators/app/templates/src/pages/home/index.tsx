import { PageContainer } from '@ant-design/pro-components';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <PageContainer>
      <NavLink to="/hello-world">to hello world</NavLink>
      <br />
      <NavLink to="/no-match">to no match</NavLink>
    </PageContainer>
  );
}
