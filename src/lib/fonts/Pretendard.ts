import localFont from '@next/font/local';

export const Pretendard = localFont({
  src: [
    {
      path: './Pretendard-Regular.subset.woff',
      weight: '400',
    },
    {
      path: './Pretendard-Medium.subset.woff',
      weight: '500',
    },
    {
      path: './Pretendard-Bold.subset.woff',
      weight: '700',
    },
  ],
});
