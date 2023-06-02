import localFont from 'next/font/local';

export const Pretendard = localFont({
  src: [
    {
      path: './Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: './Pretendard-Medium.subset.woff2',
      weight: '500',
    },
    {
      path: './Pretendard-Bold.subset.woff2',
      weight: '700',
    },
  ],
});
