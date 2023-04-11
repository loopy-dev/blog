import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import GlobalLayout from '~components/layouts/GlobalLayout';

const Resume = dynamic(() => import('../../components/Resume'));

const Page = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Me - Benlog</title>
        <meta key="title" content="About Me - Benlog" property="og:title" />
        <meta
          key="description"
          content="프론트엔드 개발자 벤을 소개합니다."
          name="description"
          property="og:description"
        />
      </Head>
      <GlobalLayout>
        {/** first part of main page, introduction */}
        <Resume />
        {/** Projects - temporary projects(same with projects page) */}
      </GlobalLayout>
    </React.Fragment>
  );
};

export default Page;
