import path from 'path';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPostMarkdown } from '~/api/post';
import ContentSkeleton from '~/components/Post/ContentSkeleton';
import ContentLayout from '~/components/layouts/ContentLayout';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import useLoading from '~/hooks/common/useLoading';
import PostService from '~/services/post';
import type { GetServerSideProps } from 'next';
import type { Post } from '~/models/Post';

interface Props {
  postMetaData: Post;
}

const LazyLoadedContent = dynamic(
  () => import('../../components/Post/Content'),
  { loading: () => <ContentSkeleton />, ssr: false }
);

const LazyLoadedTitle = dynamic(
  () => import('../../components/Post/ContentTitle')
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.query.id;

    if (typeof id !== 'string') {
      return {
        notFound: true,
        message: id,
      };
    }
    const dir = path.resolve(__dirname, '../../../../content/posts');
    const postService = new PostService(dir);
    const response = await postService.decodeMetaData(`${id}.md`);
    return {
      props: {
        postMetaData: response,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
// };

const Page = ({ postMetaData }: Props) => {
  const router = useRouter();
  const id = router.query.id;
  const [isLoading, startTransition] = useLoading();
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (typeof id !== 'string') return;

    startTransition(
      (async () => {
        try {
          const response = await getPostMarkdown(id);
          setContent(response);
        } catch (error) {
          console.error(error);
        }
      })()
    );
  }, [id, startTransition]);

  return (
    <>
      <Head>
        <title>{`${postMetaData.title} - Blog`}</title>
      </Head>
      <GlobalLayout>
        <ContentLayout>
          <LazyLoadedTitle postMetaData={postMetaData} />
          <LazyLoadedContent content={content} />
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
