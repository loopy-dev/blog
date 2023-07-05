import instance from './instance';

export const getProjectList = async () => {
  const { data } = await instance.get<any>('/api/projects');

  return data;
};
