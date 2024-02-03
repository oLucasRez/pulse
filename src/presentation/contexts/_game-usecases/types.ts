import {
  CreateGameUsecase,
  DeleteGameUsecase,
  GetGamesUsecase,
  GetGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
}
