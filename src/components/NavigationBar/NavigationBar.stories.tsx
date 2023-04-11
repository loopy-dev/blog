import NavigationBar from './NavigationBar';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/NavigationBar',
  component: NavigationBar,
} as ComponentMeta<typeof NavigationBar>;

const Template: ComponentStory<typeof NavigationBar> = () => <NavigationBar />;

export const Default = Template.bind({});
