import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ModalProvider } from '~/components/common/Modal';
import store from '~/store';
import { Pretendard } from '~/styles/fonts/Pretendard';
import ThemeProvider from '~/styles/theme/ThemeProvider';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <Head>
            <title>Benlog</title>
            <meta key="title" content="Benlog" property="og:title" />
            <meta
              key="description"
              content="Benlog입니다."
              property="og:description"
            />
          </Head>
          <div className={Pretendard.className}>
            <Component {...pageProps} />
          </div>
          <Analytics />
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
