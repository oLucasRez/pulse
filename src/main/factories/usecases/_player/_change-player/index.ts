import { IChangePlayerUsecase } from '@domain/usecases';

import { ChangePlayerUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makePlayerDAO,
  makePlayerHydrator,
} from '@main/factories';

export function makeChangePlayerUsecase(): IChangePlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new ChangePlayerUsecase({
    getMyPlayer,
    playerDAO,
    playerHydrator,
  });
}
