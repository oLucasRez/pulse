import { LoaderFunctionArgs } from 'react-router-dom';

import { GameModel, UserModel } from '@domain/models';

import {
  GetGameUsecase,
  GetMeUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

export interface GameLoaderArgs extends LoaderFunctionArgs {
  getMe: GetMeUsecase;
  getGame: GetGameUsecase;
  setCurrentGame: SetCurrentGameUsecase;
}

export type GameLoaderData = {
  me: UserModel | null;
  currentGame: GameModel;
};
