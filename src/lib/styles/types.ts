export type Theme = 'dark' | 'light';

export interface CommonPalette {
  bg_skeleton: string;
  bg_selection: string;
}

export interface ColorPalette {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  success: string;
  failure: string;
  bg_page1: string;
  bg_page2: string;
  bg_element1: string;
  bg_disabled: string;
  bg_nav: string;
  primary: string;
  primary_light: string;
  primary_variant: string;
}

export interface Palette extends CommonPalette, ColorPalette {}

export type PaletteKeys = keyof Palette;
