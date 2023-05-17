import classNames from 'classnames';
import Card, { CardContent, CardMedia } from './Card';
import type { StoryObj, Meta } from '@storybook/react';

const Component = () => {
  return (
    <div style={{ width: '500px' }}>
      <Card maxWidth={300}>
        <CardMedia height={200} src="https://picsum.photos/300/200" />
        <CardContent>
          <h3
            className={classNames('text-xl', 'font-medium', 'tracking-tight')}
          >
            Lorem ipsum
          </h3>
          <p className={classNames('mt-2', 'leading', 'text-slate-400')}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est,
            molestiae! Tempore enim fugiat natus, distinctio repudiandae magnam
            est placeat. At, in. Vel culpa laborum, atque architecto laboriosam
            porro! Pariatur, unde!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default {
  title: 'Components/Card',
  component: Component,
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
