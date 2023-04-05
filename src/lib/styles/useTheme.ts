import { useState } from 'react';

type ReturnTypes = [string, () => void];

const useTheme = (): ReturnTypes => {
  if (typeof window === 'undefined')
    throw new Error('useTheme hooks only can use on csr.');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const theme = window.localStorage.getItem('theme');

    if (theme === 'light' || theme === 'dark') {
      return theme;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  const toggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    const $body = document.querySelector('body');
    if (!$body) return;

    $body.dataset.theme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggle];
};

export default useTheme;
