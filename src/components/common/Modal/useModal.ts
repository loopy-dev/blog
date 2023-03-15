import { useDispatch, useSelector } from 'react-redux';
import { open as modalOpen, close as modalClose } from './modalSlice';
import type { RootState } from '~/store';

const useModal = () => {
  const modalState = useSelector((state: RootState) => state.isModalOpen);
  const dispatch = useDispatch();

  const open = () => {
    dispatch(modalOpen());
  };

  const close = () => {
    dispatch(modalClose());
  };

  return {
    modalState,
    open,
    close,
  };
};

export default useModal;
export type ReturnTypes = ReturnType<typeof useModal>;
