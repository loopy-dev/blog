'use client';
import dynamic from 'next/dynamic';
import { PostSkeleton, PostTemplate } from '~components/Post';
import type { FrontMatter, Post as PostModel, Series } from '~/models/Post';

interface Props {
  post: PostModel;
  recommendedPosts: FrontMatter[];
  series: Series | null;
}

// TODO - Post는 dynamic import 하지 말고, 내부 Content만 dynamic update 진행 테스트
const Post = dynamic(
  () => import('~components/Post').then((module) => module.Post),
  {
    loading: () => <PostTemplate aside={<div />} content={<PostSkeleton />} />,
  }
);

const PSDetailBuilder = ({ post, recommendedPosts, series }: Props) => {
  return (
    <Post
      category="ps"
      post={post}
      recommendedPosts={recommendedPosts}
      series={series}
    />
  );
};

export default PSDetailBuilder;
