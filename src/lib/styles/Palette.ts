import type {
  CommonPalette as CommonThemePalette,
  ColorPalette,
} from './types';

export const LightPalette: ColorPalette = {
  bg_page1: '#f6f7f7',
  bg_page2: '#ffffff',
  bg_element1: '#ffffff',
  bg_disabled: 'rgba(0, 0, 0, 0.12)',
  bg_nav: 'rgba(255, 255, 255, 0.8)',
  text1: '#202124',
  text2: '#50575e',
  text3: '#8c8f94',
  text4: '#ced4da',
  primary_variant: 'rgb(24, 144, 255)',
  primary_light: '#b2d7ef',
  primary: '#1da1f2',
  success: '#55ce9b',
  failure: 'rgb(239, 68, 68)',
};

export const DarkPalette: ColorPalette = {
  bg_page1: '#121212',
  bg_page2: '#121212',
  bg_element1: '#1e1e1e',
  bg_disabled: 'rgba(255, 255, 255, 0.12)',
  bg_nav: 'rgba(18, 18, 18, 0.8)',
  text1: '#eeeeee',
  text2: '#d1d5db',
  text3: '#bdbdbd',
  text4: '#616161',
  primary_variant: 'rgb(24, 144, 255)',
  primary: '#1da1f2',
  primary_light: '#b2d7ef',
  success: '#55ce9b',
  failure: 'rgb(239, 68, 68)',
};

export const CommonPalette: CommonThemePalette = {
  bg_skeleton: 'rgba(226, 232, 240, 1)',
  bg_selection: 'rgba(35, 131, 226, 0.28)',
};

export const Palette = {
  light: LightPalette,
  dark: DarkPalette,
};
