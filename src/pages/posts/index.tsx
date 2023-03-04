import Head from 'next/head';
import ListItem from '~/components/Post/ListItem';
import ContentLayout from '~/components/layouts/ContentLayout';
import GlobalLayout from '~/components/layouts/GlobalLayout';
import postService from '~/services/post';
import type { GetStaticProps } from 'next';
import type { FrontMatter } from '~/models/Post';

interface Props {
  posts: FrontMatter[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await postService.getPostListMetaData();

    return {
      props: {
        posts,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const Page = ({ posts }: Props) => {
  return (
    <>
      <Head>
        <title>Blog - Portfolio</title>
        <meta key="title" content="Blog - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <ContentLayout>
          <div>
            {posts.map((post) => (
              <ListItem key={post.title} post={post} />
            ))}
          </div>
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
