import {
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  DeletePlayerUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
}
