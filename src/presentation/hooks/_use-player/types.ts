import { PlayerModel } from '@domain/models';
import {
  IBanPlayerUsecase,
  IChangePlayerUsecase,
  ICreatePlayerUsecase,
  IGetPlayersUsecase,
  IWatchPlayersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerContextValue = {
  allPlayers: PlayerModel[];
  players: PlayerModel[];
  myPlayer: PlayerModel | null;
  currentPlayer: PlayerModel | null;
  currentLightSpotPlayer: PlayerModel | null;
  isMyTurn: boolean;
  fetchingPlayers: boolean;
  createPlayer: ICreatePlayerUsecase['execute'];
  changePlayer: IChangePlayerUsecase['execute'];
  banPlayer: IBanPlayerUsecase['execute'];
};

export interface PlayerContextProviderProps extends ContextProviderProps {
  getPlayers: IGetPlayersUsecase;
  watchPlayers: IWatchPlayersUsecase;
  createPlayer: ICreatePlayerUsecase;
  changePlayer: IChangePlayerUsecase;
  banPlayer: IBanPlayerUsecase;
}
