import { ReactNode } from 'react';

export interface SheetProps {
  open?: boolean;
  onClose?(): void;
  title?: ReactNode;
  children?: ReactNode;
}
