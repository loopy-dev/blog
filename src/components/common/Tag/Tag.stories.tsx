import Tag from './Tag';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Tag',
  component: Tag,
} as Meta<typeof Tag>;

export const Default: StoryObj<typeof Tag> = {
  args: {
    label: 'estimation',
    selected: false,
  },
};

export const DefaultSelected: StoryObj<typeof Tag> = {
  args: {
    label: 'estimation',
    selected: true,
  },
};
