import { IDeleteGameUsecase } from '@domain/usecases';

import { DeleteGameUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGetGameUsecase,
  makeSessionGetter,
} from '@main/factories';

export function makeDeleteGameUsecase(): IDeleteGameUsecase {
  const gameDAO = makeGameDAO();
  const getGame = makeGetGameUsecase();
  const sessionGetter = makeSessionGetter();

  return new DeleteGameUsecase({
    gameDAO,
    getGame,
    sessionGetter,
  });
}
