import { CSSProperties, ReactElement, RefObject } from 'react';

interface RippleChildrenProps {
  ref: RefObject<HTMLElement>;
  style: CSSProperties;
}

export interface RippleProps {
  children: ReactElement<RippleChildrenProps>;
}
