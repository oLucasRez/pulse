import { PlayerModel } from '@domain/models';
import {
  BanPlayerUsecase,
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  GetMyPlayerUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  players: PlayerModel[];
  allPlayers: PlayerModel[];
  myPlayer: PlayerModel | null;
  watchPlayers(
    callback?: WatchPlayersUsecase.Callback,
  ): Promise<WatchPlayersUsecase.Response>;
  fetchMyPlayer: GetMyPlayerUsecase['execute'];
  createPlayer: CreatePlayerUsecase['execute'];
  changePlayer: ChangePlayerUsecase['execute'];
  banPlayer: BanPlayerUsecase['execute'];
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  watchPlayers: WatchPlayersUsecase;
  getMyPlayer: GetMyPlayerUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  banPlayer: BanPlayerUsecase;
}
