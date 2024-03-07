import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  GetGamesUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  fetchGames: GetGamesUsecase['execute'];
  createGame: CreateGameUsecase['execute'];
  changeGame: ChangeGameUsecase['execute'];
  deleteGame: DeleteGameUsecase['execute'];
  startGame: StartGameUsecase['execute'];
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;
  startGame: StartGameUsecase;
}
