import { Analytics } from '@vercel/analytics/react';
import styled from 'styled-components';
import { ModalProvider } from '~/components/common/Modal';
import { Pretendard } from '~/styles/fonts/Pretendard';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <Container className={Pretendard.className}>
        <Component {...pageProps} />
      </Container>
      <Analytics />
    </ModalProvider>
  );
};

export default MyApp;

const Container = styled.div`
  height: 100%;
`;
