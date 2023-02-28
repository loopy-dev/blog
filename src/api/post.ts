import instance from './instance';

const getPost = async (id: string) => {
  const response = await instance.get(`/api/posts/${id}`);

  return response.data;
};

export default getPost;
