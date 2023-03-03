import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import ItemSkeleton from '~/components/Post/ItemSkeleton';
import ListItem from '~/components/Post/ListItem';
import DefferredComponent from '~/components/common/DeferredComponent';
import ContentLayout from '~/components/layouts/ContentLayout';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import useLoading from '~/hooks/common/useLoading';
import getPosts from '../../api/posts';
import type { PostMetaData } from '~/models/Post';

const Posts = dynamic(() => import('../../components/Post/PostList'), {
  ssr: false,
  loading: () => (
    <DefferredComponent>
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </DefferredComponent>
  ),
});

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

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Blog - Portfolio</title>
        <meta key="title" content="Blog - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <ContentLayout>
          <div>
            <Posts posts={posts} />
          </div>
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
