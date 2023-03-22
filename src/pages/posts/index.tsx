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

interface HeaderProps {
  title: string;
  description?: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className="my-8">
      <h1 className="font-bold text-3xl my-4 break-all">{title}</h1>
      {description && <h2 className="text-gray-500">{description}</h2>}
    </header>
  );
};
