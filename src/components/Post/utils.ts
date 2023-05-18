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

// format number
/**
 * @description format number.
 * @example
 * ```text
 * 1514 -> 1.5k
 * 30000001 -> 3M
 * under 1000 -> raw number
 * ```
 */
export const formatNumber = (count: number) => {
  if (count < 1000) {
    return String(count);
  }

  let exp = 0;
  const postFix = ['k', 'M', 'B'];

  if (count < 10 ** 6) {
    exp = 3;
  } else if (count < 10 ** 9) {
    exp = 6;
  } else {
    exp = 9;
  }

  const rest = Math.floor((count % 10 ** exp) / 10 ** (exp - 1));
  return `${Math.floor(count / 10 ** exp)}${rest === 0 ? '' : `.${rest}`}${
    postFix[exp / 3 - 1]
  }`;
};

export const shuffle = <T>(arr: T[]) => {
  const ret = [...arr];
  for (let i = 0; i < arr.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));

    [ret[i], ret[j]] = [ret[j], ret[i]];
  }

  return ret;
};
