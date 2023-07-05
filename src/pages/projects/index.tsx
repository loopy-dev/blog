import { useEffect } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import { getProjectList } from '~/lib/api/projects';
import Header from '~components/Header';
import GlobalLayout from '~components/layouts/GlobalLayout';
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

const Page = () => {
  useEffect(() => {
    (async () => {
      const response = await getProjectList();

      const frontMatters = (response.results as any[]).map<FrontMatter>(
        (data) => transformToFrontMatter(data)
      );

      console.log(frontMatters);
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
    </GlobalLayout>
  );
};

export default Page;
