import { DEFAULT_PAGE_TITLE } from '~lib/constants';
import { psService } from '~lib/post';
import { parseFileName } from '~lib/post/postService';
import json from 'content/series.json';
import type { Series } from '~models/Post';
import PSDetailBuilder from '~/posts/PSDetailBuilder';

type GenerateMetadataProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({ params }: GenerateMetadataProps) => {
  const { id } = params;
  const psMetadata = await psService.decodeMetaData(`${id}.md`);

  return {
    title: `${psMetadata.title} - ${DEFAULT_PAGE_TITLE}`,
    description: psMetadata.description,
  };
};

export const generateStaticParams = () => {
  const posts = psService.getPostList();
  return posts.map((ps) => ({ id: parseFileName(ps, 'md') }));
};

interface Props {
  params: { id: string };
}
const Page = async ({ params }: Props) => {
  const { id } = params;
  const postMetaData = await psService.decodeMetaData(`${id}.md`);
  const post = psService.decode(`${id}.md`);
  const postListMetaData = await psService.getPostListMetaData();
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
    <PSDetailBuilder
      post={postDetail}
      recommendedPosts={recommendedPosts}
      series={series}
    />
  );
};

export default Page;
