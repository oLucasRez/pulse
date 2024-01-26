import { CreatePlayerUsecase, DeletePlayerUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  createPlayer: CreatePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  createPlayer: CreatePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
}
