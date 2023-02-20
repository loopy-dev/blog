import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useModalContext } from './ModalContext';

interface Props {
  children?: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const { modalState, close } = useModalContext();

  const portal = useMemo(() => {
    const element = document.createElement('div');
    element.className = 'modal';

    return element;
  }, []);

  useEffect(() => {
    document.body.appendChild(portal);

    return () => {
      document.body.removeChild(portal);
    };
  }, [portal]);

  return <div />;
};

export default Modal;
