import { useEffect, useRef, useState } from 'react';

const useScroll = () => {
  const positionRef = useRef(0);
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY - positionRef.current > 0) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
      positionRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrollDown;
};

export default useScroll;
