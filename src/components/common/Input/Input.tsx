import type { InputHTMLAttributes } from 'react';

type Color = 'default' | 'error';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: Color;
}

type Settings = {
  [key in Color]: string;
};

const SETTINGS: Settings = {
  default: 'focus:border-indigo-500 focus:ring-indigo-500 border-gray-300',
  error: 'focus:border-red-500 focus:ring-red-500 border-red-500',
};

const Input = ({ label, variant = 'default', ...props }: Props) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={props.id}
      >
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...props}
          className={`block w-full rounded-md border min-w-0 outline-none pl-3 py-2 sm:text-sm ${SETTINGS[variant]}`}
        />
      </div>
    </div>
  );
};

export default Input;
