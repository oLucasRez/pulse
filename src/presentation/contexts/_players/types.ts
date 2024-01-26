import { CreatePlayerUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayersContextValue = {
  create: CreatePlayerUsecase;
};

export interface PlayersContextProviderProps extends ContextProviderProps {
  create: CreatePlayerUsecase;
}
