import { CRUDChangePlayerUsecase } from '@data/usecases';
import { ChangePlayerUsecase } from '@domain/usecases';

import {
  makeChangePlayerPublisher,
  makeGetMyPlayerUsecase,
  makePlayerCRUD,
} from '@main/factories';

export function makeCRUDChangePlayerUsecase(): ChangePlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerCRUD = makePlayerCRUD();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new CRUDChangePlayerUsecase({
    getMyPlayer,
    playerCRUD,
    changePlayerPublisher,
  });
}
