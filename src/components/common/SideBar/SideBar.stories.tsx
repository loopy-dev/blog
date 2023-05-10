import { useState } from 'react';
import SideBar from './SideBar';
import type { Meta, StoryObj } from '@storybook/react';

const Template = () => {
  const [state, setState] = useState(false);

  return (
    <div className="mx-auto relative w-[700px] h-screen bg-gray-200 overflow-x-hidden">
      <button
        onClick={() => {
          setState((prev) => !prev);
        }}
      >
        Click
      </button>
      <SideBar isOpen={state} />
    </div>
  );
};

export default {
  title: 'Components/SideBar',
  component: Template,
} satisfies Meta<typeof SideBar>;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    width: 400,
  },
};
