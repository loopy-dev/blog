import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import postService, { psService } from '~/lib/post';
import Header from '~components/Header';
import MainCardList from '~components/Main/MainCardList';
import MainList from '~components/Main/MainList';
import ContentLayout from '~components/layouts/ContentLayout';
import GlobalLayout from '../components/layouts/GlobalLayout';
import type { GetStaticProps } from 'next';
import type { FrontMatter } from '~models/Post';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await postService.getPostListMetaData();
    const psPosts = await psService.getPostListMetaData();

    return {
      props: {
        posts,
        psPosts,
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
  psPosts: FrontMatter[];
}

const Page = ({ posts, psPosts }: Props) => {
  const recentPosts = posts.slice(0, 5);
  const recentPsPosts = psPosts.slice(0, 5);

  return (
    <GlobalLayout>
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
        <MainList posts={recentPosts} />
      </ContentLayout>
      <ContentLayout>
        <Header
          description="알고리즘 문제를 모아볼 수 있어요."
          title="Problem Solving"
          right={
            <Link
              href="/ps"
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
        <MainCardList category="ps" posts={recentPsPosts} />
      </ContentLayout>
    </GlobalLayout>
  );
};

export default Page;
