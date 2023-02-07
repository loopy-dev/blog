import Head from 'next/head';
import Projects from '../../components/Project/Projects';
import GlobalLayout from '../../components/layouts/GlobalLayout';

const Page = () => {
  return (
    <>
      <Head>
        <title>Projects - Portfolio</title>
        <meta key="title" content="Projects - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <Projects />
      </GlobalLayout>
    </>
  );
};

export default Page;
