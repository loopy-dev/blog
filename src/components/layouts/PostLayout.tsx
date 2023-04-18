import styled from 'styled-components';

interface Props {
  content: React.ReactNode;
  aside?: React.ReactNode;
}

const PostLayout = ({ content, aside }: Props) => {
  return (
    <Container>
      <Content>{content}</Content>
      {aside ? <Aside>{aside}</Aside> : null}
    </Container>
  );
};

export default PostLayout;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  max-width: 1024px;
  align-items: start;
  margin: 0 auto;

  @media (max-width: 1023px) {
    display: block;
  }
`;

const Content = styled.article`
  padding: 24px;
  width: 100%;
  max-width: 44rem;
  margin: 0 auto;
`;

const Aside = styled.aside`
  top: 20%;
  position: sticky;
  margin-top: 20%;
  padding: 24px;
  width: 300px;

  @media (max-width: 1023px) {
    display: none;
  }
`;
