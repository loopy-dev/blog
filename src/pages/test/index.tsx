import { useEffect } from 'react';
import instance from '~/api/instance';
import ContentSkeleton from '~/components/Post/ContentSkeleton';
import ContentLayout from '~/components/layouts/ContentLayout';

const Page = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get('/api/test');
        console.log(data);
      } catch {
        console.error('something bad happend!');
      }
    })();
  }, []);
  return (
    <ContentLayout>
      <ContentSkeleton />
    </ContentLayout>
  );
};

export default Page;
