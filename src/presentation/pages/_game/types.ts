import { LoaderFunctionArgs } from 'react-router-dom';

import { GameModel } from '@domain/models';
import { GetGameUsecase } from '@domain/usecases';

export interface GameLoaderArgs extends LoaderFunctionArgs {
  getGame: GetGameUsecase;
}

export type GameLoaderData = GameModel;
