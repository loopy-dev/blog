import classNames from 'classnames';
import { notificate } from './Alert';
import AlertManager from './Alert';
import type { Meta, StoryObj } from '@storybook/react';

const Template = (args: any) => {
  return (
    <div>
      <button
        className={classNames(
          'border',
          'py-2',
          'px-4',
          'bg-white',
          'rounded',
          'hover:bg-black/10'
        )}
        onClick={() => {
          notificate('hello, World!', 1500, 'primary');
        }}
      >
        Click
      </button>
      <AlertManager {...args} />
    </div>
  );
};

export default {
  title: 'Components/Alert',
  component: Template,
} satisfies Meta<typeof AlertManager>;

export const Default: StoryObj<typeof AlertManager> = {};
