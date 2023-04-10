import SearchBar from './SearchBar';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Post/SearchBar',
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = () => <SearchBar />;

export const Default = Template.bind({});
