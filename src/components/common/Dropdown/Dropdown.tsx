import type { HTMLAttributes } from 'react';
import { createContext, useContext, useState } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpenBeginning?: boolean;
  autoClose?: boolean;
  dropdownTrigger?: (
    state: boolean,
    toggle: () => void
  ) => JSX.Element | React.ReactNode;
}

interface DropdownProps {
  isOpen: boolean;
  autoClose: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DropdownContext = createContext({});

const useDropdownContext = () => useContext(DropdownContext) as DropdownProps;

// NOTE - dropdownTrigger prop 내에 trigger 삽입 시
// 항상 DropdownTrigger Component로 감싸게 하는 방법이 이상적인가?
export const Dropdown = ({
  isOpenBeginning = false,
  autoClose = false,
  children,
  dropdownTrigger,
  ...props
}: Props) => {
  // isOpen이 true라면 dropdown이 열리고, 아니면 닫힘
  const [isOpen, setIsOpen] = useState(isOpenBeginning);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <DropdownContext.Provider
      value={{ isOpen, open, close, toggle, autoClose }}
    >
      {/** frame of dropdown */}
      <div {...props}>
        <div>
          {typeof dropdownTrigger === 'function'
            ? dropdownTrigger(isOpen, toggle)
            : dropdownTrigger}
        </div>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// TODO - state를 반환하도록 변경하기?

export const DropdownTrigger = ({
  onClick,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { toggle } = useDropdownContext();

  return (
    <div
      {...props}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
    >
      {children}
    </div>
  );
};

interface DropdownMenuProps
  extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
  type?: 'div' | 'ul';
}

export const DropdownMenu = ({
  children,
  type = 'ul',
  ...props
}: DropdownMenuProps) => {
  const { isOpen } = useDropdownContext();
  const Tag = type;
  return isOpen ? <Tag {...props}>{children}</Tag> : null;
};
