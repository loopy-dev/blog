import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  async webpackFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        modules: [path.resolve('./src'), ...(config.resolve?.modules || [])],
        fallback: {
          timers: false,
          tty: false,
          os: false,
          http: false,
          https: false,
          zlib: false,
          util: false,
          stream: false,
          fs: false,
          ...config.resolve?.fallback,
        },
        alias: {
          ...config.resolve?.alias,
          '~': path.resolve(__dirname, 'src'),
          '~components': path.resolve(__dirname, 'src/components'),
          '~hooks': path.resolve(__dirname, 'src/hooks'),
          '~models': path.resolve(__dirname, 'src/models'),
        },
      },
    };
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
