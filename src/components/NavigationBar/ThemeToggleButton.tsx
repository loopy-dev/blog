import classNames from 'classnames';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import useTheme from '~/lib/styles/useTheme';
import { Item } from './Item';
import type { Theme } from '~/lib/styles/types';

const ThemeToggleButton = () => {
  const [theme, toggle] = useTheme();

  return (
    <Item onClick={toggle}>
      <ThemeToggleIcon theme={theme} />
    </Item>
  );
};

interface ThemeToggleIconProps {
  theme?: Theme;
}

const ThemeToggleIcon = ({ theme }: ThemeToggleIconProps) => {
  return (
    <div className={classNames('flex', 'items-center', 'justify-center')}>
      {theme === 'dark' ? (
        <MdOutlineDarkMode className={classNames('text-2xl')} />
      ) : (
        <MdOutlineLightMode className={classNames('text-2xl')} />
      )}
    </div>
  );
};

export default ThemeToggleButton;
