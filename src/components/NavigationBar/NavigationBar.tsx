import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import useTheme from '~/styles/theme/useTheme';
import Icon from '../icons';

// TODO - show floating menu button when display size is under sm
const NavigationBar = () => {
  const [isDarkMode, toggle] = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleHamburgerIcon = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    // TODO - add color pallete on themes
    <Container isDarkMode={isDarkMode}>
      {/** upper part of NavigationBar */}
      <PrimaryContainer>
        <ItemWrapper className="left">
          <Title href="/">BenLog</Title>
        </ItemWrapper>
        <ItemWrapper className="right">
          <Item onClick={toggle}>{isDarkMode ? 'light' : 'dark'}</Item>
          <NavigationLinks />
        </ItemWrapper>
        <ItemWrapper className="right-hidden">
          <Item onClick={toggle}>{isDarkMode ? 'light' : 'dark'}</Item>
          <Icon type="hamburger" onClick={toggleHamburgerIcon} />
        </ItemWrapper>
      </PrimaryContainer>
      {/** hidden part of NavigationBar */}
      {isOpen ? (
        <HiddenItemWrapper>
          <NavigationLinks />
        </HiddenItemWrapper>
      ) : null}
    </Container>
  );
};

export default NavigationBar;

const NavigationLinks = () => {
  const router = useRouter();
  return (
    <>
      <Link href="/posts" style={{ width: '100%', textAlign: 'center' }}>
        <Item current={getSubDomain(router.pathname) === 'posts'}>Blog</Item>
      </Link>
      <Link href="/feedback" style={{ width: '100%', textAlign: 'center' }}>
        <Item current={getSubDomain(router.pathname) === 'feedback'}>
          Feedback
        </Item>
      </Link>
      <Link
        href="https://github.com/mrbartrns"
        rel="noopener noreferrer"
        style={{ width: '100%', textAlign: 'center' }}
        target="_blank"
      >
        <Item>Github</Item>
      </Link>
    </>
  );
};

const getSubDomain = (pathname: string) => {
  const pathArr = pathname.split('/');

  return pathArr.length > 1 ? pathArr[1] : null;
};

const Title = styled(Link)`
  font-weight: 500;
  font-size: 18px;
`;

interface ContainerProps {
  isDarkMode?: boolean;
}

const Container = styled.nav<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const PrimaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  &.right-hidden {
    display: none;
  }

  @media (max-width: 640px) {
    gap: 8px;

    &.right {
      display: none;
    }

    &.right-hidden {
      display: flex;
    }
  }
`;

interface ItemProps {
  noHoverEffect?: boolean;
  current?: boolean;
}

const Item = styled.div<ItemProps>`
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;
  font-size: 14px;

  ${({ current, theme }) =>
    current
      ? css`
          color: ${theme.text};
        `
      : css`
          color: rgb(161, 161, 170);
        `}

  ${({ noHoverEffect, theme }) =>
    !noHoverEffect &&
    css`
      &:hover {
        color: ${theme.text};
      }
    `}
`;

const HiddenItemWrapper = styled.div`
  @media (min-width: 640px) {
    display: none;
  }
`;
