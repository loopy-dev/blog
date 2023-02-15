import { useEffect } from 'react';
import getPosts from '../../api/posts';

const Page = () => {
  useEffect(() => {
    (async () => {
      try {
        const response = await getPosts();

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return <div />;
};

export default Page;
