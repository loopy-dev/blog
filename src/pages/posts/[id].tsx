import dynamic from 'next/dynamic';
import Head from 'next/head';
import PostSkeleton from '~/components/Post/PostSkeleton';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import postService from '~/lib/post';
import { parseFileName } from '~/lib/post/postService';
import PostTemplate from '~components/Post/PostTemplate';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FrontMatter, Post as PostModel } from '~/models/Post';

interface Props {
  post: PostModel;
  recommendedPosts: FrontMatter[];
}

// TODO - Post는 dynamic import 하지 말고, 내부 Content만 dynamic update 진행 테스트
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

    // NOTE - 본인 것을 제외하고 반환
    const recommendedPosts = await postService
      .getPostListMetaData()
      .then((frontmatters) =>
        frontmatters.filter((frontMatter) => frontMatter.url !== id)
      );

    return {
      props: {
        post: {
          content: post,
          ...postMetaData,
        },
        recommendedPosts,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const Page = ({ post, recommendedPosts }: Props) => {
  return (
    <GlobalLayout>
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
      <Post post={post} recommendedPosts={recommendedPosts} />
    </GlobalLayout>
  );
};

export default Page;
