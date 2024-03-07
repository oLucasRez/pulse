import { CRUDGetMyPlayerUsecase } from '@data/usecases';
import { GetMyPlayerUsecase } from '@domain/usecases';

import {
  makeGetMeUsecase,
  makePlayerCRUD,
  makePlayerPublisher,
} from '@main/factories';

export function makeCRUDGetMyPlayerUsecase(): GetMyPlayerUsecase {
  const getMe = makeGetMeUsecase();
  const playerCRUD = makePlayerCRUD();
  const playerPublisher = makePlayerPublisher();

  return new CRUDGetMyPlayerUsecase({
    getMe,
    playerCRUD,
    playerPublisher,
  });
}
