import classNames from 'classnames';
import Head from 'next/head';
import Header from '~components/Header';
import GlobalLayout from '~components/layouts/GlobalLayout';

const Page = () => {
  return (
    <GlobalLayout>
      <Head>
        <title>Projects - Benlog</title>
        <meta key="title" content="Projects - Benlog" property="og:title" />
        <meta
          key="description"
          content="사이드 프로젝트들을 모아볼 수 있어요."
          property="og:description"
        />
      </Head>
      <div
        className={classNames(
          'max-w-[44rem]',
          'lg:max-w-screen-lg',
          'p-6',
          'mx-auto'
        )}
      >
        <Header
          description="사이드 프로젝트들을 모아볼 수 있어요."
          title="Projects"
        />
      </div>
    </GlobalLayout>
  );
};

export default Page;
