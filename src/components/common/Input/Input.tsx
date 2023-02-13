import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }: Props) => {
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
          className={`block w-full rounded-md border-gray-300 border min-w-0 outline-none pl-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
        />
      </div>
    </div>
  );
};

export default Input;
