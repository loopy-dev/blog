/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'user-images.githubusercontent.com',
      'avatars.githubusercontent.com',
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
        '~services': path.resolve(__dirname, 'src/services'),
        '~hooks': path.resolve(__dirname, 'src/hooks'),
        '~models': path.resolve(__dirname, 'src/models'),
      },
      ...config.resolve,
    };

    return config;
  },
};

module.exports = nextConfig;
