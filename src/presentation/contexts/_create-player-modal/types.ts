import { ContextProviderProps } from '@presentation/types';

export type CreatePlayerModalContextValue = {
  openCreatePlayerModal(): void;
};

export interface CreatePlayerModalContextProviderProps
  extends ContextProviderProps {}
