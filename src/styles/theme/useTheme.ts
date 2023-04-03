import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLight, setDark } from './themeSlice';
import type { RootState } from '~/store';

type ReturnTypes = [string, () => void];

// const useTheme = (): ReturnTypes => {
//   const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
//   const dispatch = useDispatch();

//   const toggle = () => {
//     if (isDarkMode) {
//       dispatch(setLight());
//     } else {
//       dispatch(setDark());
//     }
//   };

//   return [isDarkMode, toggle];
// };

const useTheme = (): ReturnTypes => {
  const [theme, setTheme] = useState('light');

  const toggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    const $body = document.querySelector('body');
    if (!$body) return;

    $body.dataset.theme = theme === 'light' ? 'dark' : 'light';
  };

  useEffect(() => {
    setTheme(window.localStorage.getItem('theme') || 'light');
  }, []);

  return [theme, toggle];
};

export default useTheme;
