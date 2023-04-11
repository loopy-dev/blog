import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import Header from '~components/Header';
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
        <ContentLayout>
          <Container>
            <Image
              priority
              alt="공사중.."
              height="0"
              src="/nyan-cat.gif"
              style={{ height: 'auto', width: '100%' }}
              width="0"
            />
            <p>
              Benlog는 현재 공사중이에요.{' '}
              <Link
                href="/posts"
                style={{
                  color: `${cssVar('primary_variant')}`,
                  textDecoration: 'underline',
                }}
              >
                Posts
              </Link>
              를 눌러 글을 볼 수 있어요.
            </p>
          </Container>
        </ContentLayout>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;
