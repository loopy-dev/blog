import { useState } from 'react';

const useToggle = (initialValue?: boolean) => {
  const [state, setState] = useState(initialValue ? initialValue : false);

  const toggle = () => {
    setState((prev) => !prev);
  };

  return { on: state, toggle };
};

export default useToggle;
