import { ReactNode } from 'react';

import { DomainError } from '@domain/errors';

export type FireOptions = {
  id?: string;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  color?: string;
  step?: number;
  actionLabel?: ReactNode;
  action?(): void;
};

export type ToastType = 'tip' | 'notification' | 'step';

export type ToastHookReturn = {
  fire(type: ToastType, options?: FireOptions): void;
  dismiss(id: string): void;
  dismissAll(): void;
  error(error: DomainError): void;
};

export interface ActionButtonStyledProps {
  color?: string;
}
