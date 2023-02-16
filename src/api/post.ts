import instance from './instance';

const getPost = async (id: string) => {
  const response = await instance.get(`/api/logs/${id}`);

  return response.data;
};

export default getPost;
