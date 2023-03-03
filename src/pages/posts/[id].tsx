import dynamic from 'next/dynamic';
import Head from 'next/head';
import ContentSkeleton from '~/components/Post/ContentSkeleton';
import ContentLayout from '~/components/layouts/ContentLayout';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import postService from '~/services/post';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FrontMatter } from '~/models/Post';

interface Props {
  post: string;
  postMetaData: FrontMatter;
}

const LazyLoadedContent = dynamic(
  () => import('../../components/Post/Content'),
  { loading: () => <ContentSkeleton /> }
);

const LazyLoadedTitle = dynamic(
  () => import('../../components/Post/ContentTitle')
);

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = postService.getPostList();

  return {
    paths: posts.map((post) => ({
      params: { id: post.slice(0, -3) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const id = context.params?.id;

    if (typeof id !== 'string')
      return {
        notFound: true,
      };

    const postMetaData = await postService.decodeMetaData(`${id}.md`);
    const post = postService.decode(`${id}.md`);

    return {
      props: {
        post,
        postMetaData,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const Page = ({ post, postMetaData }: Props) => {
  return (
    <>
      <Head>
        <title>{`${postMetaData.title} - Blog`}</title>
      </Head>
      <GlobalLayout>
        <ContentLayout>
          <LazyLoadedTitle postMetaData={postMetaData} />
          <LazyLoadedContent content={post} />
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
