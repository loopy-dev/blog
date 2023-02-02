import Head from 'next/head';
import Greetings from '../components/Main/Greetings';
import MoreSection from '../components/Main/MoreSection';
import GlobalLayout from '../components/layouts/GlobalLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>About Me - Portfolio</title>
        <meta key="title" content="About Me - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <article className="mx-auto max-w-4xl p-8">
          <Greetings />
          <MoreSection />
        </article>
      </GlobalLayout>
    </>
  );
};

export default Home;
