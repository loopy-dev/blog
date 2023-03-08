import styled from 'styled-components';
import NavigationBar from '../NavigationBar';

interface Props {
  children: React.ReactNode;
}

// const Footer = dynamic(() => import('../common/Footer'));

const GlobalLayout = ({ children }: Props) => {
  return (
    <Container>
      <NavigationBar />
      <Main>{children}</Main>
      {/* <Footer /> */}
    </Container>
  );
};

export default GlobalLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Main = styled.main`
  flex: 1;
`;
