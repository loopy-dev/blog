import styled from 'styled-components';
import NavigationBar from '../NavigationBar';
import Footer from '../common/Footer';

interface Props {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar />
      <Container className="md:ml-16">
        <Main>{children}</Main>
        <Footer />
      </Container>
    </>
  );
};

export default GlobalLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.main`
  flex: 1;
`;
