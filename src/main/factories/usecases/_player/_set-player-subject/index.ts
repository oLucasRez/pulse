import { ISetPlayerSubjectUsecase } from '@domain/usecases';

import { SetPlayerSubjectUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makePlayerDAO,
  makePlayerHydrator,
} from '@main/factories';

export function makeSetPlayerSubjectUsecase(): ISetPlayerSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new SetPlayerSubjectUsecase({
    getMyPlayer,
    playerDAO,
    playerHydrator,
  });
}
