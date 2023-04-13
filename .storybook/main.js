const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, '../src/');
    config.resolve.alias['~components'] = path.resolve(
      __dirname,
      '../src/',
      'components'
    );
    return config;
  },
  docs: {
    autodocs: true,
  },
};
