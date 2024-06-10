import { ReactNode, RefObject } from 'react';

export interface PopoverProps {
  anchorRef: RefObject<HTMLElement>;
  children?: ReactNode;
  onToggle?(active: boolean): void;
}

export interface $ContainerProps {
  $left: number;
  $top: number;
}
