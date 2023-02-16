import instance from './instance';
import type { PostListResponse } from '~/models/Post';

const getPosts = async () => {
  const { data } = await instance.get<PostListResponse[]>('/api/logs');
  return data;
};

export default getPosts;
