import Input from './Input';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Input',
} as ComponentMeta<typeof Input>;

export const Default: ComponentStory<typeof Input> = () => (
  <Input id="label" label="label" placeholder="label" />
);
