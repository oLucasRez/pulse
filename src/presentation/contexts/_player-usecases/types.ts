import {
  BanPlayerUsecase,
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  DeletePlayerUsecase,
  GetMyPlayerUsecase,
  GetPlayersUsecase,
  GetPlayerUsecase,
  WatchMyPlayerUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  getPlayers: GetPlayersUsecase;
  getPlayer: GetPlayerUsecase;
  getMyPlayer: GetMyPlayerUsecase;
  watchPlayers: WatchPlayersUsecase;
  watchMyPlayer: WatchMyPlayerUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
  banPlayer: BanPlayerUsecase;
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  getPlayers: GetPlayersUsecase;
  getPlayer: GetPlayerUsecase;
  getMyPlayer: GetMyPlayerUsecase;
  watchPlayers: WatchPlayersUsecase;
  watchMyPlayer: WatchMyPlayerUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
  banPlayer: BanPlayerUsecase;
}
