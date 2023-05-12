import React from 'react';

interface SideBarProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

interface Props {
  children?: React.ReactNode;
}

const SideBarContext = React.createContext({});

export const useSideBarContext = () =>
  React.useContext(SideBarContext) as SideBarProps;

const SideBarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <SideBarContext.Provider
      value={React.useMemo(
        () => ({
          isOpen,
          open,
          close,
        }),
        [isOpen, open, close]
      )}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
