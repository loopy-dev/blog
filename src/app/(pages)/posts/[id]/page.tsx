import json from 'content/series.json';
import postService from '~/lib/post';
import { parseFileName } from '~/lib/post/postService';
import PostDetailBuilder from '~/posts/PostDetailBuilder';
import { DEFAULT_PAGE_TITLE } from '~lib/constants';
import type { Metadata } from 'next';
import type { Series } from '~/models/Post';

type GenerateMetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataProps): Promise<Metadata> => {
  const { id } = params;
  const postMetadata = await postService.decodeMetaData(`${id}.md`);

  return {
    title: `${postMetadata.title} - ${DEFAULT_PAGE_TITLE}`,
    description: postMetadata.description,
  };
};

export const generateStaticParams = async () => {
  const posts = postService.getPostList();
  return posts.map((post) => ({ id: parseFileName(post, 'md') }));
};

interface Props {
  params?: { id: string };
}

const Page = async ({ params }: Props) => {
  const id = params?.id ?? '';

  const postMetadata = await postService.decodeMetaData(`${id}.md`);
  const post = postService.decode(`${id}.md`);

  const postListMetaData = await postService.getPostListMetaData();
  const recommendedPosts = postListMetaData.filter(
    (frontMatter) => frontMatter.url !== id
  );

  let series: Series | null = null;
  const seriesId = postMetadata.series;

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
    ...postMetadata,
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
