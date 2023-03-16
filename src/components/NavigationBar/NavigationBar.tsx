import Link from 'next/link';
import styled, { css } from 'styled-components';
import useTheme from '~/styles/theme/useTheme';

// TODO - show floating menu button when display size is under sm
const NavigationBar = () => {
  const [isDarkMode, toggle] = useTheme();

  return (
    <Container isDarkMode={isDarkMode}>
      <ContentContainer>
        <ItemWrapper className="left">
          <Link href="/">
            <Item>Benlog</Item>
          </Link>
        </ItemWrapper>
        <ItemWrapper className="right">
          <Item onClick={toggle}>darkmode {isDarkMode ? 'off' : 'on'}</Item>
          <Link href="/posts">
            <Item>Blog</Item>
          </Link>
          <Link href="/feedback">
            <Item>Feedback</Item>
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

interface ContainerProps {
  isDarkMode?: boolean;
}

const Container = styled.nav<ContainerProps>`
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 99;
  transition: all 0.1s;

  ${({ isDarkMode }) =>
    isDarkMode
      ? css`
          background-color: hsla(0, 0%, 15%, 0.8);
        `
      : css`
          background-color: hsla(0, 0%, 100%, 0.8);
        `}

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
  padding: 8px 24px;
  margin: 0 auto;

  @media (max-width: 640px) {
    .right {
      display: none;
    }
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0px 10000px inset;
  }
`;
