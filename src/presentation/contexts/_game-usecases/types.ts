import { GameModel } from '@domain/models';
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
  myGames: GameModel[];
  currentGame: GameModel | null;
  fetchGame: GetGameUsecase['execute'];
  fetchGames: GetGamesUsecase['execute'];
  createGame: CreateGameUsecase['execute'];
  changeGame: ChangeGameUsecase['execute'];
  deleteGame: DeleteGameUsecase['execute'];
  startGame: StartGameUsecase['execute'];
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  getGame: GetGameUsecase;
  getGames: GetGamesUsecase;
  createGame: CreateGameUsecase;
  changeGame: ChangeGameUsecase;
  deleteGame: DeleteGameUsecase;
  startGame: StartGameUsecase;
}
