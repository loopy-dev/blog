export type Theme = 'dark' | 'light';

export interface CommonPalette {
  bg_skeleton: string;
}

export interface ColorPalette {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text_anchor: string;
  text_success: string;
  text_failure: string;
  bg_page1: string;
  bg_page2: string;
  bg_element1: string;
  bg_disabled: string;
  bg_nav: string;
}

export interface Palette extends CommonPalette, ColorPalette {}

export type PaletteKeys = keyof Palette;
