const cssVar = (variables: string) => {
  return `var(--${variables.replace(/-/g, '_')})`;
};

export default cssVar;
