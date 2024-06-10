import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { ContextProviderProps } from '@presentation/types';

import { lightTheme } from './light';

export const Theme: FC<ContextProviderProps> = ({ children }) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};
