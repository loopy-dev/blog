import json from 'content/series.json';
import postService from '~/lib/post';
import { parseFileName } from '~/lib/post/postService';
import type { FrontMatter, Post as PostModel, Series } from '~/models/Post';
import PostDetailBuilder from '~/posts/PostDetailBuilder';

interface Props {
  post: PostModel;
  recommendedPosts: FrontMatter[];
  series: Series | null;
}

export const generateStaticParams = async () => {
  const posts = postService.getPostList();

  return {
    paths: posts.map((post) => ({ id: parseFileName(post, 'md') })),
  };
};

interface Props {
  params?: { id: string };
}

const Page = async ({ params }: Props) => {
  if (!params) return <div>404</div>;

  const { id } = params;
  const postMetaData = await postService.decodeMetaData(`${id}.md`);
  const post = postService.decode(`${id}.md`);

  const postListMetaData = await postService.getPostListMetaData();
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
          new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
      ),
    };
  }

  const postDetail = {
    content: post,
    ...postMetaData,
  };

  return (
    <PostDetailBuilder
      post={postDetail}
      recommendedPosts={recommendedPosts}
      series={series}
    />
  );
};

export default Page;
