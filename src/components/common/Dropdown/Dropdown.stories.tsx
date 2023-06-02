import classNames from 'classnames';
import { Dropdown, DropdownMenu } from './Dropdown';
import type { StoryObj, Meta } from '@storybook/react';

const Template = (args: any) => {
  return (
    <Dropdown
      className={classNames('shadow-md', 'rounded')}
      {...args}
      dropdownTrigger={(isOpen, toggle) => (
        <div className={classNames('p-4')}>
          <div
            className={classNames('flex', 'justify-between', 'items-center')}
          >
            <h3 className={classNames('font-medium')}>
              무에서 유를 창조하는 블로그 시리즈
            </h3>
            <span
              className={classNames(
                {
                  'after:rotate-180': isOpen,
                },
                'text-sm',
                'transition-all',
                'select-none',
                'after:content-["▼"]',
                'after:text-xs',
                'after:ml-1',
                'cursor-pointer'
              )}
              onClick={() => {
                toggle();
              }}
            >
              펼치기
            </span>
          </div>
        </div>
      )}
      // dropdownTrigger={
      //   <DropdownTrigger className={classNames('bg-zinc-100', 'p-4')}>
      //     <h2>Hello, World!</h2>
      //   </DropdownTrigger>
      // }
    >
      <DropdownMenu className={classNames('rounded-b', 'py-2')}>
        <li
          className={classNames('p-4', 'cursor-pointer', 'hover:bg-zinc-100')}
        >
          Dropdown Item1
        </li>
        <li
          className={classNames('p-4', 'cursor-pointer', 'hover:bg-zinc-100')}
        >
          Dropdown Item2
        </li>
        <li
          className={classNames('p-4', 'cursor-pointer', 'hover:bg-zinc-100')}
        >
          Dropdown Item3
        </li>
        <li
          className={classNames('p-4', 'cursor-poinver', 'hover:bg-zinc-100')}
        >
          Dropdown Item4
        </li>
      </DropdownMenu>
    </Dropdown>
  );
};

export default {
  title: 'Components/Dropdown',
  component: Template,
} satisfies Meta<typeof Dropdown>;

export const Default: StoryObj<typeof Dropdown> = {};
