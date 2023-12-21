import Link from 'next/link';
import classNames from 'classnames';
import { FaArrowRight } from 'react-icons/fa';
import Header from '~components/Header';
import ContentLayout from '~components/layouts/ContentLayout';
import GlobalLayout from '~components/layouts/GlobalLayout';
import MainList from '~components/Main/MainList';
import MainCardList from '~components/Main/MainCardList';
import postService, { psService } from '~lib/post';

const Page = async () => {
  const posts = await postService.getPostListMetaData();
  const psPosts = await psService.getPostListMetaData();

  const recentPosts = posts.slice(0, 5);
  const recentPsPosts = psPosts.slice(0, 5);

  return (
    <GlobalLayout>
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
