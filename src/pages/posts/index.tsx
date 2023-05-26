import { useDeferredValue, useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import postService from '~/lib/post';
import Header from '~components/Header';
import ListSkeleton from '~components/Post/ListSkeleton';
import PostTemplate from '~components/Post/PostTemplate';
import SearchBar from '~components/Post/SearchBar';
import TagList from '~components/Post/TagList';
import GlobalLayout from '~components/layouts/GlobalLayout';
import useDebounce from '~hooks/useDebounce';
import InfiniteScrollComponent from '~hooks/useInfiniteScroll/InfiniteScrollComponent';
import type { GetStaticProps } from 'next';
import type { FrontMatter } from '~/models/Post';

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

const PostList = dynamic(
  () => import('../../components/Post').then((module) => module.PostList),
  {
    loading: () => <ListSkeleton />,
  }
);

const INITIAL_POST_COUNTS = 5;
const NEXT_POST_COUNTS = 5;

interface Props {
  posts: FrontMatter[];
}

const Page = ({ posts }: Props) => {
  const [keywords, setKeywords] = useState<string>('');
  const debounced = useDebounce((target: string) => {
    setKeywords(target);
  });
  const [counts, setCounts] = useState(
    Math.min(INITIAL_POST_COUNTS, posts.length)
  );

  const filteredPosts = useDeferredValue(
    keywords
      ? posts.filter(
          (post) =>
            post.title.includes(keywords) ||
            post.description.includes(keywords) ||
            post.tags.some((tag) => tag.includes(keywords))
        )
      : posts.slice(0, counts)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debounced(value);
  };

  return (
    <GlobalLayout>
      <Head>
        <title>Posts - Benlog</title>
        <meta key="title" content="Posts - Benlog" property="og:title" />
        <meta
          key="description"
          content="작성한 글들을 모아볼 수 있어요."
          property="og:description"
        />
      </Head>
      <PostTemplate
        aside={<TagList posts={posts} />}
        content={
          <>
            <Header
              description="작성한 글들을 모아볼 수 있어요."
              title="Posts"
            />
            <SearchBar onChange={handleChange} />
            <div>
              {filteredPosts.length > 0 ? (
                <>
                  <PostList posts={filteredPosts} />
                  <InfiniteScrollComponent
                    threshold={0.7}
                    onIntersect={() => {
                      setCounts((prev) =>
                        Math.min(prev + NEXT_POST_COUNTS, posts.length)
                      );
                    }}
                  />
                </>
              ) : (
                <div
                  className={classNames(
                    'flex',
                    'flex-col',
                    'gap-4',
                    'justify-center',
                    'items-center'
                  )}
                >
                  <Image
                    alt="loading"
                    height={0}
                    src="/nyan-cat.gif"
                    width={0}
                    style={{
                      marginLeft: '10%',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                  <p>해당 키워드에 대한 포스트가 아직 없네요. </p>
                </div>
              )}
            </div>
          </>
        }
      />
    </GlobalLayout>
  );
};

export default Page;
