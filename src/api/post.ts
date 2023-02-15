import instance from './instance';

const getPost = async (id: string) => {
  const response = await instance.get(`/api/post/${id}`);
  return response;
};

export default getPost;
