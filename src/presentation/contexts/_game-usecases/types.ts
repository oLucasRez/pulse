import {
  CreateGameUsecase,
  DeleteGameUsecase,
  GetCurrentGameUsecase,
  GetGamesUsecase,
  GetGameUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  getCurrentGame: GetCurrentGameUsecase;
  setCurrentGame: SetCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getCurrentGame: GetCurrentGameUsecase;
  setCurrentGame: SetCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  deleteGame: DeleteGameUsecase;
}
