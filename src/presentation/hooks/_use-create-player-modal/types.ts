import { ReactNode } from 'react';

export type CreatePlayerModalHookReturn = {
  openCreatePlayerModal(): void;
  renderCreatePlayerModal(): ReactNode;
};
