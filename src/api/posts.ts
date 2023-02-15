import instance from './instance';

const getPosts = async () => {
  const response = await instance.get('/api/posts');
  return response;
};

export default getPosts;
