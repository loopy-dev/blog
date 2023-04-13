import Head from 'next/head';
import Header from '~components/Header';
import Banner from '~components/Main';
import ListItem from '~components/Post/ListItem';
import ContentLayout from '~components/layouts/ContentLayout';
import postService from '~services/post';
import GlobalLayout from '../components/layouts/GlobalLayout';
import type { GetStaticProps } from 'next';
import type { FrontMatter } from '~models/Post';

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

interface Props {
  posts: FrontMatter[];
}

const Page = ({ posts }: Props) => {
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Head>
        <title>Main - Benlog</title>
        <meta key="title" content="Main - Benlog" property="og:title" />
        <meta
          key="description"
          content="벤로그에 오신 것을 환영합니다!"
          name="description"
          property="og:description"
        />
      </Head>
      <GlobalLayout>
        <Banner />
        <ContentLayout>
          <Header
            description="최근에 작성한 글을 볼 수 있어요."
            title="Recent Posts"
          />
          {recentPosts.map((post) => (
            <ListItem key={post.title} post={post} />
          ))}
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
