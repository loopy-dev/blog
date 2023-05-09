export const setElementId = (children: React.ReactNode | React.ReactNode[]) => {
  const replaceId = (id: string) =>
    id.replace(/\s/g, '-').replace(/\?!@#$%^&\*()_\+=/g, '');

  return Array.isArray(children)
    ? replaceId(String(children[0]))
    : typeof children === 'string'
    ? replaceId(children)
    : undefined;
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
