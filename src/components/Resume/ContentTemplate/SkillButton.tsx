import type { ButtonHTMLAttributes } from 'react';
import classes from './SkillButton.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
}

const SkillButton = ({ selected, children, ...props }: Props) => {
  return (
    <button
      {...props}
      type="button"
      className={`${
        selected ? classes.selected : ''
      } border py-1 px-4 rounded-full cursor-pointer hover:bg-green-400 hover:text-white select-none transition-all whitespace-nowrap`}
    >
      {children}
    </button>
  );
};

export default SkillButton;
