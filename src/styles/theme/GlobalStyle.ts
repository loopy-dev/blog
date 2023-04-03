import { createGlobalStyle } from 'styled-components';
import cssVar from '~/utils/cssVar';

const lightStyle = `
  --background: #f8f9fa;
  --text: #202124;
  --navBackground: hsla(0, 0%, 100%, 0.8);
`;

const darkStyle = `
  --background: #121212;
  --text: #fff;
  --navBackground: hsla(0, 0%, 15%, 0.8);
`;

const GlobalStyle = createGlobalStyle`
  :root {
    ${lightStyle}
  }

  body {
    transition: background-color 0.1s ease-in, color 0.1s ease-in;
    background-color: ${cssVar('background')};
    color: ${cssVar('text')};

    &[data-theme='light'] {
      ${lightStyle};
    }

    &[data-theme='dark'] {
      ${darkStyle};
    }
  }


  @media (prefers-color-scheme: dark) {
    body {
      ${darkStyle};
    }
  }

`;
export default GlobalStyle;
