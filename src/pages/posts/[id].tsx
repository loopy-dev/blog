import dynamic from 'next/dynamic';
import Head from 'next/head';
import PostSkeleton from '~/components/Post/ContentSkeleton';
import ContentLayout from '~/components/layouts/ContentLayout';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import postService from '~/services/post';
import { parseFileName } from '~/services/post/postService';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FrontMatter, Post } from '~/models/Post';

interface Props {
  post: Post;
}

const LazyLoadedContent = dynamic(
  () => import('../../components/Post/Content'),
  { loading: () => <PostSkeleton /> }
);

const LazyLoadedTitle = dynamic(
  () => import('../../components/Post/ContentTitle')
);

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = postService.getPostList();

  return {
    paths: posts.map((post) => ({
      params: { id: parseFileName(post, 'md') },
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
        post: {
          content: post,
          ...postMetaData,
        },
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const Page = ({ post }: Props) => {
  const frontMatter: FrontMatter = {
    title: post.title,
    tags: post.tags,
    createdTime: post.createdTime,
    description: post.description,
  };

  return (
    <>
      <Head>
        <title>{`${post.title} - Blog`}</title>
      </Head>
      <GlobalLayout>
        <ContentLayout>
          <LazyLoadedTitle postMetaData={{ ...frontMatter }} />
          <LazyLoadedContent content={post.content} />
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
