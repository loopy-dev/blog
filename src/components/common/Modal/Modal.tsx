import Portal from '../Portal';
import className from './Modal.module.scss';
import { useModalContext } from './ModalContext';

interface Props {
  children?: React.ReactNode;
}

// if Modal state is open, then render. no control with css display property.
const ModalBackground = ({ children }: Props) => {
  const { modalState, close } = useModalContext();

  return (
    <Portal>
      {modalState ? (
        <div className={`${className.modal}`} onClick={close}>
          {children}
        </div>
      ) : null}
    </Portal>
  );
};

// genenral Modal Container
const Modal = ({ children }: Props) => {
  return (
    <ModalBackground>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </ModalBackground>
  );
};

export default Modal;
