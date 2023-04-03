import GlobalStyle from '~/lib/styles/GlobalStyle';
import Input from './Input';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Input',
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <div>
    <GlobalStyle />
    <Input id="label" label="label" placeholder="label" {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  disabled: false,
};
