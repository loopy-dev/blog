import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  body {
    transition: background-color 0.1s ease-in, color 0.1s ease-in;

    ${({ theme }) => css`
      background-color: ${theme.background};
      color: ${theme.text};
    `}

  }

  @media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

`;
export default GlobalStyle;
