import type { PaletteKeys } from './types';

const cssVar = (variables: PaletteKeys) => {
  return `var(--${variables.replace(/_/g, '-')})`;
};

export default cssVar;
