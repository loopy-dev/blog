import dynamic from 'next/dynamic';
import Head from 'next/head';
import PostSkeleton from '~/components/Post/PostSkeleton';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import postService from '~/lib/post';
import { parseFileName } from '~/lib/post/postService';
import PostLayout from '~components/layouts/PostLayout';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Post as PostModel } from '~/models/Post';

interface Props {
  post: PostModel;
}

const PostContent = dynamic(() => import('../../components/Post'), {
  loading: () => <PostSkeleton />,
});

const PostAside = dynamic(() => import('../../components/Post/PostAside'), {
  ssr: false,
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
          property="og:title"
        />
        <meta
          key="description"
          content={post.description}
          property="og:description"
        />
      </Head>
      <GlobalLayout>
        {/* <ContentLayout>
          <LazyLoadedPost post={post} />
        </ContentLayout> */}
        <PostLayout
          aside={<PostAside />}
          content={<PostContent post={post} />}
        />
      </GlobalLayout>
    </>
  );
};

export default Page;
