import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import postService from '~/lib/post';
import Header from '~components/Header';
import PostList from '~components/Post/PostList/PostList';
import ContentLayout from '~components/layouts/ContentLayout';
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
  const recentPosts = posts.slice(0, 5);

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
        {/* <Banner /> */}
        <ContentLayout>
          <Header
            description="최근에 작성한 글을 볼 수 있어요."
            title="Recent Posts"
            right={
              <Link
                href="/posts"
                className={classNames(
                  'inline-flex',
                  'items-center',
                  'gap-2',
                  'text-[color:var(--primary-variant)]',
                  'hover:underline'
                )}
              >
                이동하기{' '}
                <FaArrowRight className={classNames('hidden', 'sm:block')} />
              </Link>
            }
          />
          <PostList posts={recentPosts} />
        </ContentLayout>
      </GlobalLayout>
    </>
  );
};

export default Page;
