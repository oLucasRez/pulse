import { IChangeGameUsecase } from '@domain/usecases';

import { ChangeGameUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeChangeGameUsecase(): IChangeGameUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new ChangeGameUsecase({
    gameDAO,
    gameHydrator,
    getCurrentGame,
  });
}
