import Link from 'next/link';
import styled from 'styled-components';

// TODO - show floating menu button when display size is under sm
const NavigationBar = () => {
  return (
    <Container>
      <ContentContainer>
        <ItemWrapper className="left">
          <Link href="/">
            <Item>Benlog</Item>
          </Link>
        </ItemWrapper>
        <ItemWrapper className="right">
          <Link href="/posts">
            <Item>Blog</Item>
          </Link>
          <Link
            href="https://github.com/mrbartrns"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Item>Github</Item>
          </Link>
        </ItemWrapper>
      </ContentContainer>
    </Container>
  );
};

export default NavigationBar;

const Container = styled.nav`
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  background-color: hsla(0, 0%, 100%, 0.8);
  z-index: 99;
  transition: all 0.1s;

  @media (min-width: 768px) {
    position: sticky;
    top: 0;
    backdrop-filter: saturate(180%) blur(5px);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 56rem;
  padding: 8px 24px;
  margin: 0 auto;

  @media (max-width: 768px) {
    .right {
      display: none;
    }
  }
`;

const ItemWrapper = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  padding: 8px 16px;
  border-radius: 4px;
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0px 10000px inset;
  }
`;
