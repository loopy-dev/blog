import NavigationBar from './NavigationBar';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

type ComponentMeta = Meta<typeof NavigationBar>;
type StoryTemplate = StoryFn<typeof NavigationBar>;
type StoryComponent = StoryObj<typeof NavigationBar>;

export default {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as ComponentMeta;

const Template: StoryTemplate = () => <NavigationBar />;

export const Default: StoryComponent = {
  render: Template,
};
