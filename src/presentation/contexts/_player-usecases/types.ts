import { PlayerModel } from '@domain/models';

import {
  BanPlayerUsecase,
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  WatchMyPlayerUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  players: PlayerModel[];
  myPlayer: PlayerModel | null;
  fetchingMyPlayer: boolean;
  currentPlayer: PlayerModel | null;
  createPlayer: CreatePlayerUsecase['execute'];
  changePlayer: ChangePlayerUsecase['execute'];
  banPlayer: BanPlayerUsecase['execute'];
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  watchPlayers: WatchPlayersUsecase;
  watchMyPlayer: WatchMyPlayerUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  banPlayer: BanPlayerUsecase;
}
