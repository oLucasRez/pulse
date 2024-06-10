import { ReactNode } from 'react';
import { ToastPosition } from 'react-toastify';

import { Color } from '@domain/enums';
import { DomainError } from '@domain/errors';

export type FireOptions = {
  id?: string;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  color?: Color;
  step?: number;
  actionLabel?: ReactNode;
  position?: ToastPosition;
  action?(): void;
};

export type ToastType = 'tip' | 'notification' | 'step';

export type ToastHookReturn = {
  fire(type: ToastType, options?: FireOptions): void;
  dismiss(id: string): void;
  dismissAll(): void;
  success(message: string): void;
  error(error: DomainError): void;
};

export interface ActionButtonStyledProps {
  color?: string;
}
