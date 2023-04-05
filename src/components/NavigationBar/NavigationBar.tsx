import { useState } from 'react';
import { Noto_Sans_KR } from '@next/font/google';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import Icon from '../icons';
import { Item } from './Item';

const ThemeToggleButton = dynamic(() => import('./ThemeToggleButton'), {
  ssr: false,
});

const notoSans = Noto_Sans_KR({
  weight: '500',
  style: ['normal'],
  subsets: ['latin'],
});

// TODO - show floating menu button when display size is under sm
const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburgerIcon = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    // TODO - add color pallete on themes
    <Container>
      {/** upper part of NavigationBar */}
      <PrimaryContainer>
        <ItemWrapper className="left">
          <Title className={notoSans.className} href="/">
            BenLog
          </Title>
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
  font-size: 24px;

  &:after {
    content: '.';
    padding-left: 4px;
    color: ${cssVar('primary')};
  }
`;

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 99;
  transition: all 0.1s;
  background-color: ${cssVar('bg_nav')};

  @media (min-width: 768px) {
    position: sticky;
    top: 0;
    backdrop-filter: saturate(180%) blur(5px);
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
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
