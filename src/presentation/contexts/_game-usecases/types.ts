import {
  CreateGameUsecase,
  DeleteGameUsecase,
  GetCurrentGameUsecase,
  GetGamesUsecase,
  GetGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  getCurrentGame: GetCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getCurrentGame: GetCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
}
