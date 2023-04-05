import Button from './Button';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  variant: 'default',
  borderStyle: 'solid',
  size: 'md',
  fullWidth: false,
  disabled: false,
  children: 'hello, world!',
};
