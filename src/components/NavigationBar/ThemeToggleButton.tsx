import classNames from 'classnames';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import useTheme from '~/lib/styles/useTheme';
import type { Theme } from '~/lib/styles/types';

const ThemeToggleButton = () => {
  const [theme, toggle] = useTheme();

  return (
    <div
      className={classNames(
        'flex',
        'justify-center',
        'items-center',
        'w-full',
        'select-none',
        'transition-all',
        'cursor-pointer',
        'font-medium',
        'py-1',
        'px-2',
        'dark:text-zinc-300',
        'dark:hover:text-zinc-100',
        'text-zinc-600',
        'hover:text-zinc-800'
      )}
      onClick={toggle}
    >
      <ThemeToggleIcon theme={theme} />
    </div>
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
