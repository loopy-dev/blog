import classNames from 'classnames';
import ProgressBar from './ProgressBar';
import type { StoryObj, Meta } from '@storybook/react';

const Template = (args: any) => {
  return (
    <div className={classNames('w-full', 'relative')}>
      <ProgressBar {...args} />
    </div>
  );
};

export default {
  title: 'Components/ProgressBar',
  component: Template,
} satisfies Meta<typeof ProgressBar>;

export const Default: StoryObj<typeof ProgressBar> = {
  args: {
    width: 50,
  },
};
