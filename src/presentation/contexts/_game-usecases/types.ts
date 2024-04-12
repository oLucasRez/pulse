import { GameModel } from '@domain/models';
import {
  IChangeGameUsecase,
  ICreateGameUsecase,
  IDeleteGameUsecase,
  IGetGamesUsecase,
  IGetGameUsecase,
  IStartGameUsecase,
  IVoteUsecase,
  IWatchCurrentGameUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type GameUsecasesContextValue = {
  myGames: GameModel[];
  currentGame: GameModel | null;
  watchCurrentGame(
    callback?: IWatchCurrentGameUsecase.Callback,
  ): Promise<IWatchCurrentGameUsecase.Response>;
  fetchGame: IGetGameUsecase['execute'];
  fetchGames: IGetGamesUsecase['execute'];
  createGame: ICreateGameUsecase['execute'];
  changeGame: IChangeGameUsecase['execute'];
  deleteGame: IDeleteGameUsecase['execute'];
  startGame: IStartGameUsecase['execute'];
  vote: IVoteUsecase['execute'];
};

export interface GameUsecasesContextProviderProps extends ContextProviderProps {
  watchCurrentGame: IWatchCurrentGameUsecase;
  getGame: IGetGameUsecase;
  getGames: IGetGamesUsecase;
  createGame: ICreateGameUsecase;
  changeGame: IChangeGameUsecase;
  deleteGame: IDeleteGameUsecase;
  startGame: IStartGameUsecase;
  vote: IVoteUsecase;
}
