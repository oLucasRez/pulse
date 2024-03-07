import { CRUDSetPlayerSubjectUsecase } from '@data/usecases';
import { SetPlayerSubjectUsecase } from '@domain/usecases';

import {
  makeGetMyPlayerUsecase,
  makePlayerCRUD,
  makePlayerPublisher,
} from '@main/factories';

export function makeCRUDSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDSetPlayerSubjectUsecase({
    getMyPlayer,
    playerCRUD,
    playerPublisher,
  });
}
