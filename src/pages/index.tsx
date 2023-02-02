import Head from 'next/head';
import GlobalLayout from '../components/layouts/GlobalLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>About Me - Portfolio</title>
        <meta key="title" content="About Me - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <article className="mx-auto max-w-4xl">
          {/** greetings */}
          <div className="my-24 font-bold text-7xl leading-normal">
            <h1>안녕하세요,</h1>
            <h1>저는</h1>
            <h1>____한 개발자</h1>
            <h1>고준혁 입니다.</h1>
          </div>
        </article>
      </GlobalLayout>
    </>
  );
};

export default Home;
