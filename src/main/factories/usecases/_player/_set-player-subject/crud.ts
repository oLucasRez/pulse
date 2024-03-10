import { CRUDSetPlayerSubjectUsecase } from '@data/usecases';
import { SetPlayerSubjectUsecase } from '@domain/usecases';

import {
  makeChangePlayerPublisher,
  makeGetMyPlayerUsecase,
  makePlayerCRUD,
} from '@main/factories';

export function makeCRUDSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerCRUD = makePlayerCRUD();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new CRUDSetPlayerSubjectUsecase({
    getMyPlayer,
    playerCRUD,
    changePlayerPublisher,
  });
}
