import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>About Me - Portfolio</title>
        <meta key="title" content="About Me - Portfolio" property="og:title" />
      </Head>
      <div>
        <div>Sidebar</div>
        <div>Main</div>
      </div>
    </>
  );
};

export default Home;
