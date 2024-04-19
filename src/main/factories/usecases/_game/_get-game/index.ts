import { IGetGameUsecase } from '@domain/usecases';

import { GetGameUsecase } from '@data/usecases';

import { makeGameDAO, makeGameHydrator } from '@main/factories';

export function makeGetGameUsecase(): IGetGameUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();

  return new GetGameUsecase({ gameDAO, gameHydrator });
}
