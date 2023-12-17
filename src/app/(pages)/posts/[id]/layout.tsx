import Head from 'next/head';
import GlobalLayout from '~components/layouts/GlobalLayout';
import { DEFAULT_PAGE_TITLE } from '~lib/constants';
import postService from '~lib/post';
import type { FrontMatter } from '~models/Post';

type GenerateMetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({ params }: GenerateMetadataProps) => {
  const { id } = params;
  const postMetaData = await postService.decodeMetaData(`${id}.md`);
  return {
    metaData: postMetaData,
  };
};

interface Props {
  children?: React.ReactNode;
  metaData: FrontMatter;
}

const Layout = ({ children, metaData }: Props) => {
  return (
    <GlobalLayout>
      <Head>
        <title>
          {metaData.title} - {DEFAULT_PAGE_TITLE}
        </title>
        <meta
          key="title"
          content={`${metaData.title} - ${DEFAULT_PAGE_TITLE}`}
          property="og:title"
        />
        <meta
          key="description"
          content={metaData.description}
          property="og:description"
        />
      </Head>
      {children}
    </GlobalLayout>
  );
};

export default Layout;
