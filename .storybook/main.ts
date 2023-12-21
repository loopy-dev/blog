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
    options: {
      builder: {
        useSWC: true,
      },
    },
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
          '~components': path.resolve(__dirname, 'src/components'),
          '~hooks': path.resolve(__dirname, 'src/hooks'),
          '~lib': path.resolve(__dirname, 'src/lib'),
          '~models': path.resolve(__dirname, 'src/models'),
          '~t': path.resolve(__dirname, 'src/types'),
          '~': path.resolve(__dirname, 'src'),
        },
      },
    };
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
