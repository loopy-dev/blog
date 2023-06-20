import classNames from 'classnames';
import ImageItem from './BackgroundImage';
import type { Meta, StoryObj } from '@storybook/react';

const Template = () => {
  return (
    <ImageItem
      blockHeight="400px"
      // imageUrl="https://picsum.photos/1600/900"
      altImage="linear-gradient(
      90deg,
      rgba(9, 121, 113, 1) 0%,
      rgba(0, 212, 255, 1) 82%
    )"
    >
      <div className={classNames('text-white')}>
        <h1 className={classNames('text-4xl')}>Hello, World!</h1>
        <p>This is description</p>
      </div>
    </ImageItem>
  );
};

export default {
  title: 'Components/ImageItem',
  component: Template,
} satisfies Meta<typeof Template>;

export const Default: StoryObj<typeof Template> = {};
