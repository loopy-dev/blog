'use client';
import dynamic from 'next/dynamic';
import { PostSkeleton, PostTemplate } from '~components/Post';
import PostNavbar from '~components/Post/PostDetail/PostNavbar';
import type { FrontMatter, Post as PostModel, Series } from '~/models/Post';

const Post = dynamic(
  () => import('~components/Post').then((module) => module.Post),
  {
    loading: () => <PostTemplate aside={<div />} content={<PostSkeleton />} />,
  }
);

interface Props {
  post: PostModel;
  recommendedPosts: FrontMatter[];
  series: Series | null;
}

const PostDetailBuilder = ({ post, recommendedPosts, series }: Props) => {
  return (
    <>
      <PostNavbar />
      <Post post={post} recommendedPosts={recommendedPosts} series={series} />
    </>
  );
};

export default PostDetailBuilder;
