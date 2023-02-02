import type { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
}

const LinkButton = ({ children, ...props }: Props) => {
  return (
    <a
      {...props}
      className={`inline-flex items-center py-4 px-8 bg-gray-800 text-gray-50 text-lg rounded-lg`}
    >
      {children}
    </a>
  );
};

export default LinkButton;
