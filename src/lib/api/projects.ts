import instance from './instance';

export const getProjectList = async () => {
  const { data } = await instance.get('/api/projects');

  return data;
};
