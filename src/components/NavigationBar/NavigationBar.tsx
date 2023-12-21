'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import Icon from '../icons';
import styles from './NavigationBar.module.scss';
import { DEFAULT_PAGE_TITLE } from '~lib/constants';

const ThemeToggleButton = dynamic(() => import('./ThemeToggleButton'), {
  ssr: false,
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
        <Left />
        <Middle />
        <Right />
        <Hidden onClick={toggleHamburgerIcon} />
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

const Left = () => {
  return (
    <div
      className={classNames(
        'left',
        'flex',
        'items-center',
        'gap-2',
        'sm:gap-0'
      )}
    >
      <Logo />
    </div>
  );
};

const Logo = () => {
  return (
    <Link className={classNames(styles.title)} href="/">
      {DEFAULT_PAGE_TITLE}
    </Link>
  );
};

const Right = () => {
  return (
    <div className={classNames('hidden', 'sm:flex')}>
      <ThemeToggleButton />
      <NavigationLinks />
    </div>
  );
};

const Middle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isShowing, setIsShowing] = useState(false);
  const [postTitle, setPostTitle] = useState('');

  // useEffect(() => {
  //   const isPostPath = getSubDomain(pathname) === 'posts';
  //   setIsShowing(isPostPath);
  // }, [pathname]);

  // useEffect(() => {
  //   const handler = () => {
  //     const title = document.querySelector('.post-title');

  //     if (!title) return;

  //     setPostTitle(title.textContent || '');
  //   };

  //   handler();

  //   router.events.on('routeChangeComplete', handler);

  //   return () => {
  //     router.events.off('routeChangeComplete', handler);
  //   };
  // }, [router.events]);

  return (
    <div
      className={classNames(
        'hidden',
        'md:flex',
        'flex-col',
        'justify-center',
        'items-center',
        'w-full',
        'text-center'
      )}
    >
      {postTitle}
    </div>
  );
};

interface HiddenComponentProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Hidden = ({ onClick }: HiddenComponentProps) => {
  return (
    <div className={classNames('flex', 'sm:hidden')}>
      <ThemeToggleButton />
      <Icon type="hamburger" onClick={onClick} />
    </div>
  );
};

interface NavigationLinkProps {
  href: string;
  children?: React.ReactNode;
}

const getPathname = (href: string) => {
  if (href[0] !== '/') {
    return href;
  }

  return href.slice(1);
};

const NavigationLink = ({ href, children }: NavigationLinkProps) => {
  const pathname = getPathname(href);
  const isExternalLink = href === pathname;

  return (
    <li className={classNames('w-full', 'text-center', 'flex', 'items-center')}>
      <Link
        href={href}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
        target={isExternalLink ? '_blank' : undefined}
        title={typeof children === 'string' ? children : pathname}
        className={classNames(
          'flex',
          'justify-center',
          'items-center',
          'w-full',
          'select-none',
          'transition-all',
          'py-1',
          'px-2',
          'font-medium',
          'text-zinc-600',
          'dark:text-zinc-300',
          {
            'text-zinc-800': getSubDomain(pathname) === pathname,
            'dark:text-zinc-100': getSubDomain(pathname) === pathname,
          },
          'hover:text-zinc-800',
          'dark:hover:text-zinc-100'
        )}
      >
        {children}
      </Link>
    </li>
  );
};

const NavigationLinks = () => {
  const links = [
    {
      href: '/posts',
      children: 'Posts',
    },
    {
      href: '/about',
      children: 'About',
    },
    {
      href: 'https://github.com/mrbartrns',
      children: <FaGithub className={classNames('text-xl')} />,
    },
  ];
  return (
    <>
      {links.map((link) => (
        <NavigationLink key={link.href} href={link.href}>
          {link.children}
        </NavigationLink>
      ))}
    </>
  );
};

const getSubDomain = (pathname: string) => {
  const pathArr = pathname.split('/');

  return pathArr.length > 1 ? pathArr[1] : null;
};
