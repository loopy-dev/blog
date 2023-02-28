import instance from './instance';
import type { PostMetaData } from '~/models/Post';

export const getPostMetaData = async (id: string) => {
  const response = await instance.get<PostMetaData>(`/api/posts/${id}`);

  return response.data;
};

export const getPostMarkdown = async (id: string) => {
  const response = await instance.get<string>(`/api/posts/content/${id}`);

  return response.data;
};
