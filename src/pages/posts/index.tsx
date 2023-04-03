import Head from 'next/head';
import ListItem from '~/components/Post/ListItem';
import postService from '~/services/post';
import Header from '~components/Header';
import ContentLayout from '~components/layouts/ContentLayout';
import GlobalLayout from '~components/layouts/GlobalLayout';
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
          <Header
            description="쓴 글들을 모아볼 수 있는 포스트 페이지입니다."
            title="블로그"
          />
          {posts.map((post) => (
            <ListItem key={post.title} post={post} />
          ))}
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
