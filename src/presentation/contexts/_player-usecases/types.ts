import {
  BanPlayerUsecase,
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  GetMyPlayerUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type PlayerUsecasesContextValue = {
  fetchMyPlayer: GetMyPlayerUsecase['execute'];
  createPlayer: CreatePlayerUsecase['execute'];
  changePlayer: ChangePlayerUsecase['execute'];
  banPlayer: BanPlayerUsecase['execute'];
};

export interface PlayerUsecasesContextProviderProps
  extends ContextProviderProps {
  getMyPlayer: GetMyPlayerUsecase;
  createPlayer: CreatePlayerUsecase;
  changePlayer: ChangePlayerUsecase;
  banPlayer: BanPlayerUsecase;
}
