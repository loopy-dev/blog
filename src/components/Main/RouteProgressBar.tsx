import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import ProgressBar from '~components/common/ProgressBar/ProgressBar';
import styles from './RouteProgressBar.module.scss';

const RouteProgressBar = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [className, setClassName] = useState('');

  useEffect(() => {
    const handleStart = () => {
      setClassName('progress-bar__phase-1');
      setProgress(0);
    };

    const handleChange = () => {
      const randomInt = Math.floor(Math.random() * 51 + 30);

      setProgress(randomInt);

      // setTimeout을 이용하여 애니메이션 처리 가능
      window.setTimeout(() => {
        setClassName('progress-bar__phase-2');
        setProgress(100);
      }, 250);

      window.setTimeout(() => {
        setClassName('');
        setProgress(0);
      }, 500);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleChange);
    router.events.on('routeChangeError', handleChange);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleChange);
      router.events.off('routeChangeError', handleChange);
    };
  }, [router.events]);

  return (
    <ProgressBar className={classNames(styles[className])} width={progress} />
  );
};

export default RouteProgressBar;
