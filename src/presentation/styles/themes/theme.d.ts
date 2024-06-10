import 'styled-components';

import { Color } from '@domain/enums';

declare module 'styled-components' {
  export type ColorVariation = {
    light: string;
    normal: string;
    dark: string;
  };

  export interface DefaultTheme {
    border: string;
    background: ColorVariation;
    foreground: ColorVariation;
    transparent: ColorVariation;
    color(color?: Color): ColorVariation;
    elevation: {
      0: string;
      1: string;
    };
    error: ColorVariation;
  }
}
