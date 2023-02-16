import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getPost from '~/api/post';
import type { Post } from '~/models/Post';

interface Props {
  post: Post;
}

const Page = () => {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (typeof id !== 'string') return;

    (async () => {
      try {
        const response = await getPost(id);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);
  return <div>{id}</div>;
};

export default Page;
