import React from 'react';
import GlobalLayout from '~components/layouts/GlobalLayout';
import { DEFAULT_PAGE_TITLE } from '~lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About Me - ${DEFAULT_PAGE_TITLE}`,
  description: '프론트엔드 개발자 벤을 소개합니다.',
  openGraph: {
    title: `About Me - ${DEFAULT_PAGE_TITLE}`,
    description: '프론트엔드 개발자 벤을 소개합니다.',
  },
};

interface Props {
  children?: React.ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;

  return <GlobalLayout>{children}</GlobalLayout>;
};

export default Layout;
