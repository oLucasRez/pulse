import {
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  DeletePlayerUsecase,
  GetPlayersUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  getPlayers: GetPlayersUsecase;
  watchPlayers: WatchPlayersUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  getPlayers: GetPlayersUsecase;
  watchPlayers: WatchPlayersUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  deletePlayer: DeletePlayerUsecase;
}
