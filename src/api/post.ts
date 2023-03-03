import instance from './instance';
import type { FrontMatter } from '~/models/Post';

export const getPostMetaData = async (id: string) => {
  const response = await instance.get<FrontMatter>(`/api/posts/${id}`);

  return response.data;
};

export const getPostMarkdown = async (id: string) => {
  const uri = encodeURI(id);
  const response = await instance.get<string>(`/api/posts/content/${uri}`);

  return response.data;
};
