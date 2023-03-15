import type { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
  background: '#fff',
  text: '#202124',
};

export const dark: DefaultTheme = {
  background: '#202124',
  text: '#fefefe',
};

const theme = {
  light,
  dark,
};

export default theme;
