import { CRUDChangePlayerUsecase } from '@data/usecases';
import { ChangePlayerUsecase } from '@domain/usecases';

import {
  makeGetMyPlayerUsecase,
  makePlayerCRUD,
  makePlayerPublisher,
} from '@main/factories';

export function makeCRUDChangePlayerUsecase(): ChangePlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDChangePlayerUsecase({
    getMyPlayer,
    playerCRUD,
    playerPublisher,
  });
}
