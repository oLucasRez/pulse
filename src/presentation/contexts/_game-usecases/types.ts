import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  GetGamesUsecase,
  GetGameUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;

  startGame: StartGameUsecase;
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;

  startGame: StartGameUsecase;
}
