import { RxArrowRight, RxMagnifyingGlass } from 'react-icons/rx';
import Button from './Button';
import type { StoryObj, Meta } from '@storybook/react';

type ComponentMeta = Meta<typeof Button>;
type StoryComponent = StoryObj<typeof Button>;

export default {
  title: 'Components/new/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['solid', 'soft', 'surface', 'outline', 'ghost'],
      control: {
        type: 'select',
      },
    },
    radius: {
      options: ['none', 'small', 'medium', 'large', 'full'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: {
        type: 'select',
      },
    },
    color: {
      options: ['accent'],
      control: {
        type: 'select',
      },
    },
    loading: {
      contorl: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      action: 'onClick',
    },
  },
} as ComponentMeta;

export const Default: StoryComponent = {
  render: (args) => <Button {...args}>Hello, World!</Button>,
  args: {
    variant: 'soft',
    radius: 'small',
    size: 'md',
    color: 'accent',
    loading: false,
  },
};

export const Loading: StoryComponent = {
  render: (args) => <Button {...args}>Hello, World!</Button>,
  args: {
    variant: 'soft',
    radius: 'small',
    size: 'md',
    color: 'accent',
    loading: true,
  },
};

export const Disabled: StoryComponent = {
  render: (args) => <Button {...args}>Hello, World!</Button>,
  args: {
    variant: 'soft',
    radius: 'small',
    size: 'md',
    color: 'accent',
    disabled: true,
  },
};

export const WithSideContent: StoryComponent = {
  render: (args) => (
    <Button
      {...args}
      leftContent={<RxMagnifyingGlass fontSize={18} fontWeight={'bold'} />}
      rightContent={<RxArrowRight fontSize={18} fontWeight={'bold'} />}
    >
      Search
    </Button>
  ),
  args: {
    variant: 'soft',
    radius: 'small',
    size: 'md',
    color: 'accent',
  },
};
