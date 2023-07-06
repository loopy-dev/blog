import { useEffect, useState, useDeferredValue } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import { getProjectList } from '~/lib/api/projects';
import Header from '~components/Header';
import { PostTemplate } from '~components/Post';
import { PostList, NoResult } from '~components/Post';
import GlobalLayout from '~components/layouts/GlobalLayout';
import InfiniteScrollComponent from '~hooks/useInfiniteScroll/InfiniteScrollComponent';
import type { FrontMatter } from '~models/Post';

const transformToFrontMatter = (data: any): FrontMatter => {
  const titleProperty = '이름';
  const title = (() => {
    try {
      return data.properties[titleProperty].title[0].plain_text as string;
    } catch {
      return '';
    }
  })();

  const description = (() => {
    try {
      return data.properties.description.rich_text[0].plain_text as string;
    } catch {
      return '';
    }
  })();

  return {
    title,
    url: data.id,
    createdTime: data.created_time,
    tags: [],
    description,
    coverImage: data.cover || undefined,
  };
};

const INITIAL_POST_COUNTS = 5;
const NEXT_POST_COUNTS = 5;

const Page = () => {
  const [posts, setPosts] = useState<FrontMatter[]>([]);

  // used in infinite scroll
  const [counts, setCounts] = useState(
    Math.min(INITIAL_POST_COUNTS, posts.length)
  );

  const filteredPosts = useDeferredValue(posts.slice(0, counts));

  useEffect(() => {
    (async () => {
      const response = await getProjectList();

      const frontMatters = (response.results as any[]).map<FrontMatter>(
        (data) => transformToFrontMatter(data)
      );

      setPosts(frontMatters);
    })();
  }, []);

  return (
    <GlobalLayout>
      <Head>
        <title>Projects - Benlog</title>
        <meta key="title" content="Projects - Benlog" property="og:title" />
        <meta
          key="description"
          content="사이드 프로젝트들을 모아볼 수 있어요."
          property="og:description"
        />
      </Head>
      <div
        className={classNames(
          'max-w-[44rem]',
          'lg:max-w-screen-lg',
          'p-6',
          'mx-auto'
        )}
      >
        <Header
          description="사이드 프로젝트들을 모아볼 수 있어요."
          title="Projects"
        />
      </div>
      <PostTemplate
        content={
          <div>
            {filteredPosts.length > 0 ? (
              <PostList category="projects" posts={filteredPosts} />
            ) : (
              <NoResult message="해당 키워드에 대한 포스트가 아직 없네요." />
            )}
            <InfiniteScrollComponent
              threshold={0.7}
              onIntersect={() => {
                setCounts((prev) =>
                  Math.min(prev + NEXT_POST_COUNTS, posts.length)
                );
              }}
            />
          </div>
        }
      />
    </GlobalLayout>
  );
};

export default Page;
