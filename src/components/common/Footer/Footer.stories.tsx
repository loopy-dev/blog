import GlobalStyle from '~/lib/styles/GlobalStyle';
import Footer from './Footer';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => (
  <>
    <GlobalStyle />
    <Footer />
  </>
);

export const Default = Template.bind({});
