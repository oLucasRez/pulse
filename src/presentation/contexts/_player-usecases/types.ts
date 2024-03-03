import {
  BanPlayerUsecase,
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  DeletePlayerUsecase,
  GetCurrentPlayerUsecase,
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
  getCurrentPlayer: GetCurrentPlayerUsecase;
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
  getCurrentPlayer: GetCurrentPlayerUsecase;
  watchPlayers: WatchPlayersUsecase;
  watchMyPlayer: WatchMyPlayerUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
  banPlayer: BanPlayerUsecase;
}
