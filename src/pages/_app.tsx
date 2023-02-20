import { Analytics } from '@vercel/analytics/react';
import { ModalProvider } from '~/components/common/Modal';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <Component {...pageProps} />
      <Analytics />
    </ModalProvider>
  );
};

export default MyApp;
