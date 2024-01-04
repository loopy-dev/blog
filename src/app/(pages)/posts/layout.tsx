import GlobalLayout from '~components/layouts/GlobalLayout';
import { DEFAULT_PAGE_TITLE } from '~lib/constants';
import type { Metadata } from 'next';

interface Props {
  children?: React.ReactNode;
}

export const metadata: Metadata = {
  title: `Posts - ${DEFAULT_PAGE_TITLE}`,
  description: '작성한 글들을 모아볼 수 있어요.',
  openGraph: {
    title: `Posts- ${DEFAULT_PAGE_TITLE}`,
    description: '작성한 글들을 모아볼 수 있어요.',
  },
};

const Layout = ({ children }: Props) => {
  return <GlobalLayout>{children}</GlobalLayout>;
};

export default Layout;
