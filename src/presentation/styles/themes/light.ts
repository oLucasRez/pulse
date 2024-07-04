import { DefaultTheme } from 'styled-components';

import { Color } from '@domain/enums';

import { darken, getColor, lighten } from '../mixins';

export const lightTheme: DefaultTheme = {
  border: '1px solid #F5F5F5',
  background: {
    light: '#FFFFFF',
    normal: '#F5F5F5',
    dark: darken('#F5F5F5', 0.05),
  },
  foreground: {
    light: lighten('#778', 0.2),
    normal: lighten('#778', 0.1),
    dark: '#778',
  },
  transparent: {
    light: 'rgba(255, 255, 255, 0.5)',
    normal: 'transparent',
    dark: 'rgba(0, 0, 0, 0.05)',
  },
  color(color: Color) {
    return {
      light: [Color.PINK].includes(color)
        ? lighten(getColor(color), 0.1)
        : lighten(getColor(color), 0.2),
      normal: [Color.CYAN].includes(color)
        ? darken(getColor(color), 0.05)
        : [Color.PURPLE, Color.BROWN, Color.CRIMSON].includes(color)
        ? lighten(getColor(color), 0.075)
        : getColor(color),
      dark: darken(
        getColor(color),
        [Color.RED, Color.BEIGE].includes(color) ? 0.2 : 0.1,
      ),
      contrast: [Color.CYAN, Color.YELLOW, Color.GREY].includes(color)
        ? darken(color, 0.3)
        : [Color.BEIGE].includes(color)
        ? darken(color, 0.6)
        : 'white',
    };
  },
  elevation: {
    0: 'box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);',
    1: 'box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);',
  },
  error: {
    light: lighten('#FF544B', 0.2),
    normal: '#FF544B',
    dark: darken('#FF544B', 0.1),
  },
};
