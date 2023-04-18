import dynamic from 'next/dynamic';
import Head from 'next/head';
import PostSkeleton from '~/components/Post/PostSkeleton';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import postService from '~/lib/post';
import { parseFileName } from '~/lib/post/postService';
import PostTemplate from '~components/Post/PostTemplate';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post as PostModel } from '~/models/Post';

interface Props {
  post: PostModel;
}

const Post = dynamic(() => import('../../components/Post'), {
  loading: () => <PostTemplate aside={<div />} content={<PostSkeleton />} />,
});

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
  return (
    <>
      <Head>
        <title>{`${post.title} - Benlog`}</title>
        <meta
          key="title"
          content={`${post.title} - Benlog`}
          name="title"
          property="og:title"
        />
        <meta
          key="description"
          content={post.description}
          name="description"
          property="og:description"
        />
      </Head>
      <GlobalLayout>
        <Post post={post} />
      </GlobalLayout>
    </>
  );
};

export default Page;
