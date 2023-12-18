import React from 'react';
import Head from 'next/head';
import GlobalLayout from '~components/layouts/GlobalLayout';
import { DEFAULT_PAGE_TITLE } from '~lib/constants';
import type { Metadata } from 'next';

const metadata: Metadata = {
  title: `About Me - ${DEFAULT_PAGE_TITLE}`,
  description: '프론트엔드 개발자 벤을 소개합니다.',
};

interface Props {
  children?: React.ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <GlobalLayout>
      <Head>
        <title>About Me - {DEFAULT_PAGE_TITLE}</title>
        <meta
          key="title"
          content={typeof metadata.title === 'string' ? metadata.title : ''}
          property="og:title"
        />
        <meta
          key="description"
          content={metadata.description ?? ''}
          name="description"
          property="og:description"
        />
      </Head>
      {children}
    </GlobalLayout>
  );
};

export default Layout;
