import { createGlobalStyle } from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import { CommonPalette, Palette } from './Palette';

const lightStyle = `
  --bg-page1: ${Palette.light.bg_page1};
  --bg-page2: ${Palette.light.bg_page2};
  --bg-element1: ${Palette.light.bg_element1};
  --bg-disabled: ${Palette.light.bg_disabled};
  --text1: ${Palette.light.text1};
  --text2: ${Palette.light.text2};
  --text3: ${Palette.light.text3};
  --text4: ${Palette.light.text4};
  --primary-variant: ${Palette.light.primary_variant};
  --success: ${Palette.light.success};
  --failure: ${Palette.light.failure};
  --bg-nav: ${Palette.light.bg_nav};
  --primary: ${Palette.light.primary};
  --primary-light: ${Palette.light.primary_light};
`;

const darkStyle = `
  --bg-page1: ${Palette.dark.bg_page1};
  --bg-page2: ${Palette.dark.bg_page2};
  --bg-element1: ${Palette.dark.bg_element1};
  --bg-disabled: ${Palette.dark.bg_disabled};
  --text1: ${Palette.dark.text1};
  --text2: ${Palette.dark.text2};
  --text3: ${Palette.dark.text3};
  --text4: ${Palette.dark.text4};
  --primary-variant: ${Palette.dark.primary_variant};
  --success: ${Palette.dark.success};
  --failure: ${Palette.dark.failure};
  --bg-nav: ${Palette.dark.bg_nav};
  --primary: ${Palette.light.primary};
  --primary-light: ${Palette.dark.primary_light};
`;

const commonStyle = `
  --bg-skeleton: ${CommonPalette.bg_skeleton};
`;

const GlobalStyle = createGlobalStyle`
  :root {
    ${lightStyle}
    ${commonStyle}
  }

  body {
    transition: background-color 0.1s ease-in, color 0.1s ease-in;
    background-color: ${cssVar('bg_page2')};
    color: ${cssVar('text1')};

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
