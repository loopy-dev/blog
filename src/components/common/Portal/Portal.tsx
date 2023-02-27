import { useMemo, useEffect } from 'react';
import REACTDOM from 'react-dom';

export interface Props {
  children?: React.ReactNode;
}

const Portal = ({ children }: Props) => {
  const portal = useMemo(() => {
    const element = document.createElement('div');
    element.className = 'portal';

    return element;
  }, []);

  useEffect(() => {
    document.body.appendChild(portal);

    return () => {
      document.body.removeChild(portal);
    };
  }, [portal]);

  return REACTDOM.createPortal(children, portal);
};

export default Portal;
