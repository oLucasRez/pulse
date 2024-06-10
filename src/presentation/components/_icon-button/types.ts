import { ReactNode } from 'react';

type Size = 'small' | 'medium' | 'large';

export interface IconButtonProps {
  className?: string;
  icon: ReactNode;
  size?: Size;
  loading?: boolean;
  onClick?(): void;
}

export interface $ContainerProps {
  $size?: Size;
}
