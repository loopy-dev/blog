import GlobalStyle from '~/lib/styles/GlobalStyle';
import Skeleton from './Skeleton';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Skeleton',
} as ComponentMeta<typeof Skeleton>;

export const Default: ComponentStory<typeof Skeleton> = () => (
  <div style={{ display: 'flex', width: '100%' }}>
    <GlobalStyle />
    {[3, 5, 2, 7, 6, 5, 4].map((flex, index) => (
      <Skeleton key={index} flex={flex} height={'20px'} />
    ))}
  </div>
);
