import Button from './Button';
import type { StoryObj, StoryFn, Meta } from '@storybook/react';

type ComponentMeta = Meta<typeof Button>;
type StoryTemplate = StoryFn<typeof Button>;
type StoryComponent = StoryObj<typeof Button>;

export default {
  title: 'Components/new/Button',
  component: Button,
} as ComponentMeta;

const Template: StoryTemplate = () => <Button />;

export const Default: StoryComponent = {
  render: Template,
};
