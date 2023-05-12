import SideBar from './SideBar';
import SideBarProvider, { useSideBarContext } from './SideBarContext';
import type { Meta, StoryObj } from '@storybook/react';

const Component = () => {
  const { isOpen, open, close } = useSideBarContext();
  return (
    <div>
      <button
        onClick={() => {
          if (isOpen) {
            close();
          } else {
            open();
          }
        }}
      >
        Click
      </button>
      <SideBar />
    </div>
  );
};

const Template = () => {
  return (
    <SideBarProvider>
      <Component />
    </SideBarProvider>
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
