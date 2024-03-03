import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  GetCurrentGameUsecase,
  GetGamesUsecase,
  GetGameUsecase,
  StartGameUsecase,
  WatchCurrentGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  getCurrentGame: GetCurrentGameUsecase;
  watchCurrentGame: WatchCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;

  startGame: StartGameUsecase;
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getCurrentGame: GetCurrentGameUsecase;
  watchCurrentGame: WatchCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;

  startGame: StartGameUsecase;
}
