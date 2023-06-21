import { useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa';
import Icon from '../icons';
import { Item } from './Item';
import styles from './NavigationBar.module.scss';

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
    <nav
      className={classNames(
        styles['navigation-bar-container'],
        'flex',
        'flex-col',
        'gap-2',
        'z-30',
        'transition',
        'bg-white/80',
        'dark:bg-zinc-900/80'
      )}
    >
      {/** upper part of NavigationBar */}
      <div
        className={classNames(
          'flex',
          'justify-between',
          'items-center',
          'py-2',
          'px-6',
          'w-full',
          'max-w-5xl',
          'my-0',
          'mx-auto'
        )}
      >
        <div
          className={classNames(
            'left',
            'flex',
            'items-center',
            'gap-2',
            'sm:gap-0'
          )}
        >
          <Link
            className={classNames(notoSans.className, styles.title)}
            href="/"
          >
            BenLog
          </Link>
        </div>
        <div className={classNames('hidden', 'sm:flex')}>
          <ThemeToggleButton />
          <NavigationLinks />
        </div>
        <div className={classNames('flex', 'sm:hidden')}>
          <ThemeToggleButton />
          <Icon type="hamburger" onClick={toggleHamburgerIcon} />
        </div>
      </div>
      {/** hidden part of NavigationBar */}
      {isOpen ? (
        <div className={classNames('block', 'sm:hidden')}>
          <NavigationLinks />
        </div>
      ) : null}
    </nav>
  );
};

export default NavigationBar;

const NavigationLinks = () => {
  const router = useRouter();
  return (
    <>
      <Link
        className={classNames('w-full', 'text-center', 'flex', 'items-center')}
        href="/posts"
      >
        <Item current={getSubDomain(router.pathname) === 'posts'}>Posts</Item>
      </Link>
      <Link
        className={classNames('w-full', 'text-center', 'flex', 'items-center')}
        href="/about"
      >
        <Item current={getSubDomain(router.pathname) === 'posts'}>About</Item>
      </Link>
      <Link
        className={classNames('w-full', 'text-center', 'flex', 'items-center')}
        href="https://github.com/mrbartrns"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Item>
          <FaGithub className={classNames('text-xl')} />
        </Item>
      </Link>
    </>
  );
};

const getSubDomain = (pathname: string) => {
  const pathArr = pathname.split('/');

  return pathArr.length > 1 ? pathArr[1] : null;
};
