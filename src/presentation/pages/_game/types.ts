import { LoaderFunctionArgs } from 'react-router-dom';

import { GameModel, UserModel } from '@domain/models';

import { GetGameUsecase, GetMeUsecase } from '@domain/usecases';

export interface GameLoaderArgs extends LoaderFunctionArgs {
  getMe: GetMeUsecase;
  getGame: GetGameUsecase;
}

export type GameLoaderData = {
  me: UserModel | null;
  currentGame: GameModel;
};
