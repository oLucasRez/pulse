import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  GetCurrentGameUsecase,
  GetGamesUsecase,
  GetGameUsecase,
  SetCurrentGameUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  getCurrentGame: GetCurrentGameUsecase;
  setCurrentGame: SetCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;

  startGame: StartGameUsecase;
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getCurrentGame: GetCurrentGameUsecase;
  setCurrentGame: SetCurrentGameUsecase;
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;

  startGame: StartGameUsecase;
}
