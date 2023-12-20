'use client';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import json from 'content/series.json';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import { psService } from '~/lib/post';
import { parseFileName } from '~/lib/post/postService';
import { PostSkeleton, PostTemplate } from '~components/Post';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FrontMatter, Post as PostModel, Series } from '~/models/Post';

interface Props {
  post: PostModel;
  recommendedPosts: FrontMatter[];
  series: Series | null;
}

// TODO - Post는 dynamic import 하지 말고, 내부 Content만 dynamic update 진행 테스트
const Post = dynamic(
  () => import('~components/Post').then((module) => module.Post),
  {
    loading: () => <PostTemplate aside={<div />} content={<PostSkeleton />} />,
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = psService.getPostList();

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

    const postMetaData = await psService.decodeMetaData(`${id}.md`);
    const post = psService.decode(`${id}.md`);

    const postListMetaData = await psService.getPostListMetaData();

    // NOTE - 본인 것을 제외하고 반환
    const recommendedPosts = postListMetaData.filter(
      (frontMatter) => frontMatter.url !== id
    );

    let series: Series | null = null;
    const seriesId = postMetaData.series;

    if (seriesId) {
      const seriesItems = postListMetaData.filter(
        (frontMatter) => frontMatter.series === seriesId
      );

      series = {
        id: seriesId,
        title: (json as Record<string, string>)[seriesId] || seriesId,
        items: seriesItems.sort(
          (a, b) =>
            new Date(a.createdTime).getTime() -
            new Date(b.createdTime).getTime()
        ),
      };
    }

    return {
      props: {
        post: {
          content: post,
          ...postMetaData,
        },
        recommendedPosts,
        series,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const PSDetailBuilder = ({ post, recommendedPosts, series }: Props) => {
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
      <Post
        category="ps"
        post={post}
        recommendedPosts={recommendedPosts}
        series={series}
      />
    </GlobalLayout>
  );
};

export default PSDetailBuilder;
