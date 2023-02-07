import Head from 'next/head';
import Introduction from '../components/Main/Introduction';
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
          {/** first part of main page, introduction */}
          <Introduction />
          <section>{/** introduction */}</section>
        </article>
      </GlobalLayout>
    </>
  );
};

export default Home;
