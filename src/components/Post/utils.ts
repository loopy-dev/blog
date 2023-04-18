export const setElementId = (children: React.ReactNode | React.ReactNode[]) => {
  const replaceId = (id: string) =>
    id.replace(/\s/g, '-').replace(/\?!@#$%^&\*()_\+=/g, '');

  return Array.isArray(children)
    ? replaceId(String(children[0]))
    : typeof children === 'string'
    ? replaceId(children)
    : undefined;
};
