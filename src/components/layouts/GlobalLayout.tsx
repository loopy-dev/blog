import styled from 'styled-components';
import Footer from '~components/common/Footer';
import NavigationBar from '../NavigationBar';

interface Props {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  return (
    <Container>
      <NavigationBar />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

export default GlobalLayout;

const Container = styled.div`
  position: relative;
`;

const Main = styled.main`
  position: relative;
  min-height: 800px;
`;
