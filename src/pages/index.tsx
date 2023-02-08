import Head from 'next/head';
import Resume from '../components/Resume';
import GlobalLayout from '../components/layouts/GlobalLayout';

const Page = () => {
  return (
    <>
      <Head>
        <title>About Me - Portfolio</title>
        <meta key="title" content="About Me - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        {/** first part of main page, introduction */}
        <Resume />
        {/** Projects - temporary projects(same with projects page) */}
      </GlobalLayout>
    </>
  );
};

export default Page;
