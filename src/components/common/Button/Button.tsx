import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const DEFAULT_SETTINGS = `border border-gray-300 rounded-md text-sm py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white drop-shadow-md focus:ring-1 focus:ring-indigo-400 whitespace-nowrap select-none`;

const Button = ({ fullWidth, ...props }: Props) => {
  return (
    <button
      {...props}
      className={DEFAULT_SETTINGS.concat(fullWidth ? ' w-full' : '')}
    />
  );
};

export default Button;
