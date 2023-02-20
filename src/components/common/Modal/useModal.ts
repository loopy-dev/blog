import { useState } from 'react';

const useModal = () => {
  const [modalState, setModalState] = useState(false);

  const open = () => {
    setModalState(true);
  };

  const close = () => {
    setModalState(false);
  };

  return {
    modalState,
    open,
    close,
  };
};

export default useModal;
export type ReturnTypes = ReturnType<typeof useModal>;
