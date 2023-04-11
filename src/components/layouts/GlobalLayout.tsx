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
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  min-height: 800px;
`;
