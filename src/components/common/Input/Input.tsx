import type { InputHTMLAttributes } from 'react';
import React from 'react';
import Label from './Label';

type Color = 'default' | 'error';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
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

const Input = (
  { label, variant = 'default', ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <div>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          ref={ref}
          {...props}
          className={`block w-full rounded-md border min-w-0 outline-none pl-3 py-2 sm:text-sm ${SETTINGS[variant]} bg-transparent`}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(Input);
