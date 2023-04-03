import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import cssVar from '~/utils/cssVar';
import Icon from '../icons';
import { Item } from './Item';

const ThemeToggleButton = dynamic(() => import('./ThemeToggleButton'), {
  ssr: false,
});

// TODO - show floating menu button when display size is under sm
const NavigationBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleHamburgerIcon = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    // TODO - add color pallete on themes
    <Container>
      {/** upper part of NavigationBar */}
      <PrimaryContainer>
        <ItemWrapper className="left">
          <Title href="/">BenLog</Title>
        </ItemWrapper>
        <ItemWrapper className="right">
          <ThemeToggleButton />
          <NavigationLinks />
        </ItemWrapper>
        <ItemWrapper className="right-hidden">
          <ThemeToggleButton />
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

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 99;
  transition: all 0.1s;
  background-color: ${cssVar('navBackground')};

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

const HiddenItemWrapper = styled.div`
  @media (min-width: 640px) {
    display: none;
  }
`;
