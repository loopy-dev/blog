import styled from 'styled-components';

interface Props {
  content: React.ReactNode;
  aside?: React.ReactNode;
}

const PostTemplate = ({ content, aside }: Props) => {
  return (
    <Container>
      <Article>{content}</Article>
      {aside ? <Aside>{aside}</Aside> : null}
    </Container>
  );
};

export default PostTemplate;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  align-items: start;

  @media (max-width: 1023px) {
    display: block;
  }
`;

const Article = styled.article`
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
