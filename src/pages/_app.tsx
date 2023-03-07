import { Analytics } from '@vercel/analytics/react';
import { ModalProvider } from '~/components/common/Modal';
import { Pretendard } from '~/styles/fonts/Pretendard';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <div className={Pretendard.className}>
        <Component {...pageProps} />
      </div>
      <Analytics />
    </ModalProvider>
  );
};

export default MyApp;
