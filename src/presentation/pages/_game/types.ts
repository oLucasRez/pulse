import { LoaderFunctionArgs } from 'react-router-dom';

import { GameModel } from '@domain/models';
import { IGetGameUsecase } from '@domain/usecases';

export interface GameLoaderArgs extends LoaderFunctionArgs {
  getGame: IGetGameUsecase;
}

export type GameLoaderData = GameModel;
