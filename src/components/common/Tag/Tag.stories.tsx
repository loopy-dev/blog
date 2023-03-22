import Tag from './Tag';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Tag',
} as ComponentMeta<typeof Tag>;

export const Default: ComponentStory<typeof Tag> = () => (
  <Tag label="estimation" />
);
