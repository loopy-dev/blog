import { useSelector } from 'react-redux';
import { ThemeProvider as ThemeStyledProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { dark, light } from './theme';
import type { RootState } from '~/store';

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const theme = isDarkMode ? dark : light;

  return (
    <ThemeStyledProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeStyledProvider>
  );
};

export default ThemeProvider;
