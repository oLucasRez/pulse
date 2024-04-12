import { PlayerModel } from '@domain/models';
import {
  IBanPlayerUsecase,
  IChangePlayerUsecase,
  ICreatePlayerUsecase,
  IGetMyPlayerUsecase,
  IWatchPlayersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  players: PlayerModel[];
  allPlayers: PlayerModel[];
  myPlayer: PlayerModel | null;
  watchPlayers(
    callback?: IWatchPlayersUsecase.Callback,
  ): Promise<IWatchPlayersUsecase.Response>;
  fetchMyPlayer: IGetMyPlayerUsecase['execute'];
  createPlayer: ICreatePlayerUsecase['execute'];
  changePlayer: IChangePlayerUsecase['execute'];
  banPlayer: IBanPlayerUsecase['execute'];
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  watchPlayers: IWatchPlayersUsecase;
  getMyPlayer: IGetMyPlayerUsecase;
  createPlayer: ICreatePlayerUsecase;
  changePlayer: IChangePlayerUsecase;
  banPlayer: IBanPlayerUsecase;
}
