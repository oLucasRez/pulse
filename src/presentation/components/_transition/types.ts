import { ReactElement } from 'react';

export interface FadeProps {
  active: boolean;
  ms: number;
  children: ReactElement;
}

export interface ScaleProps {
  active: boolean;
  ms: number;
  inactiveFactor?: number;
  activeFactor?: number;
  children: ReactElement;
}
