import instance from './instance';
import type { FrontMatter } from '~/models/Post';

const getPosts = async () => {
  const { data } = await instance.get<FrontMatter[]>('/api/posts');
  return data;
};

export default getPosts;
