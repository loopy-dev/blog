import { useState, useEffect } from 'react';
import ContentLayout from '~/components/layouts/ContentLayout';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import useLoading from '~/hooks/common/useLoading';
import getPosts from '../../api/posts';
import type { PostMetaData } from '~/models/Post';

const Page = () => {
  const [isLoading, startTransition] = useLoading();
  const [posts, setPosts] = useState<PostMetaData[]>([]);

  useEffect(() => {
    startTransition(
      (async () => {
        try {
          const response = await getPosts();
          setPosts(response);
        } catch (error) {
          console.error(error);
        }
      })()
    );
  }, [startTransition]);
  return (
    <GlobalLayout>
      <ContentLayout>{JSON.stringify(posts)}</ContentLayout>
    </GlobalLayout>
  );
};

export default Page;
