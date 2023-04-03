import useTheme from '~/lib/styles/useTheme';
import { Item } from './Item';

const ThemeToggleButton = () => {
  const [theme, toggle] = useTheme();

  return <Item onClick={toggle}>{theme === 'dark' ? 'light' : 'dark'}</Item>;
};

export default ThemeToggleButton;
