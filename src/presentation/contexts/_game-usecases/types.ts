import { GameModel } from '@domain/models';

import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  GetGamesUsecase,
  StartGameUsecase,
  WatchCurrentGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  games: GameModel[];
  fetchingGames: boolean;
  currentGame: GameModel | null;
  createGame: CreateGameUsecase['execute'];
  changeGame: ChangeGameUsecase['execute'];
  deleteGame: DeleteGameUsecase['execute'];

  startGame: StartGameUsecase['execute'];
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  watchCurrentGame: WatchCurrentGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;

  startGame: StartGameUsecase;
}
