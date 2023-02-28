import instance from './instance';
import type { PostMetaData } from '~/models/Post';

const getPosts = async () => {
  const { data } = await instance.get<PostMetaData[]>('/api/posts');
  return data;
};

export default getPosts;
