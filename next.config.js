/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'user-images.githubusercontent.com',
      'avatars.githubusercontent.com',
      'github.com',
    ],
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            ext: 'tsx',
          },
        },
      ],
    });

    config.resolve = {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '~components': path.resolve(__dirname, 'src/components'),
        '~hooks': path.resolve(__dirname, 'src/hooks'),
        '~models': path.resolve(__dirname, 'src/models'),
      },
      ...config.resolve,
    };

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
