import {
  CreateGameUsecase,
  DeleteGameUsecase,
  GetGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  getGame: GetGameUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getGame: GetGameUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
}
