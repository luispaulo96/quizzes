import { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';

interface Props {
  children?: ReactNode,
}

const Layout = ({ children }: Props) => {
  return (
    <Container>{children}</Container>
  );
}

export default Layout;
