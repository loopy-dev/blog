import Head from 'next/head';
import GlobalLayout from '~components/layouts/GlobalLayout';
import { DEFAULT_PAGE_TITLE } from '~lib/constants';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <GlobalLayout>
      <Head>
        <title>Posts - {DEFAULT_PAGE_TITLE}</title>
        <meta
          key="title"
          content={`Posts - ${DEFAULT_PAGE_TITLE}`}
          property="og:title"
        />
        <meta
          key="description"
          content="작성한 글들을 모아볼 수 있어요."
          property="og:description"
        />
      </Head>
      {children}
    </GlobalLayout>
  );
};

export default Layout;
