import { useContext, createContext } from 'react';
import useModal from './useModal';
import type { ReturnTypes as ModalProps } from './useModal';

interface Props {
  children?: React.ReactNode;
}

const ModalContext = createContext({});

export const useModalContext = () => useContext(ModalContext) as ModalProps;

const ModalProvider = ({ children }: Props) => {
  return (
    <ModalContext.Provider value={useModal()}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
