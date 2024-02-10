import {
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  DeletePlayerUsecase,
  GetMyPlayerUsecase,
  GetPlayersUsecase,
  GetPlayerUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  getPlayers: GetPlayersUsecase;
  getPlayer: GetPlayerUsecase;
  getMyPlayer: GetMyPlayerUsecase;
  watchPlayers: WatchPlayersUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  getPlayers: GetPlayersUsecase;
  getPlayer: GetPlayerUsecase;
  getMyPlayer: GetMyPlayerUsecase;
  watchPlayers: WatchPlayersUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
}
