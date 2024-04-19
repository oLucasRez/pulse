import { GameModel } from '@domain/models';
import {
  IChangeGameUsecase,
  ICreateGameUsecase,
  IDeleteGameUsecase,
  IGetGamesUsecase,
  IStartGameUsecase,
  IVoteUsecase,
  IWatchGamesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameContextValue = {
  games: GameModel[];
  currentGame: GameModel | null;
  fetchingGames: boolean;
  createGame: ICreateGameUsecase['execute'];
  changeGame: IChangeGameUsecase['execute'];
  deleteGame: IDeleteGameUsecase['execute'];
  startGame: IStartGameUsecase['execute'];
  vote: IVoteUsecase['execute'];
};

export interface GameContextProviderProps extends ContextProviderProps {
  getGames: IGetGamesUsecase;
  watchGames: IWatchGamesUsecase;
  createGame: ICreateGameUsecase;
  changeGame: IChangeGameUsecase;
  deleteGame: IDeleteGameUsecase;
  startGame: IStartGameUsecase;
  vote: IVoteUsecase;
}
