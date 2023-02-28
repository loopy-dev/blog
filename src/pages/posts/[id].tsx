import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { getPostMarkdown, getPostMetaData } from '~/api/post';
import ContentLayout from '~/components/layouts/ContentLayout';
import useLoading from '~/hooks/common/useLoading';
import postService from '~/services/post';
import type { GetServerSideProps } from 'next';
import type { Post } from '~/models/Post';

interface Props {
  postMetaData: Post;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.query.id;

    if (typeof id !== 'string') {
      return {
        notFound: true,
        message: id,
      };
    }

    const response = await postService.getMetaData(id);
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

  useEffect(() => {
    console.log(postMetaData);
  }, [postMetaData]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <ContentLayout>
      <ReactMarkdown>{content}</ReactMarkdown>
    </ContentLayout>
  );
};

export default Page;
