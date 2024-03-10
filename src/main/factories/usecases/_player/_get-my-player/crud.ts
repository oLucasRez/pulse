import { CRUDGetMyPlayerUsecase } from '@data/usecases';
import { GetMyPlayerUsecase } from '@domain/usecases';

import {
  makeFetchPlayerPublisher,
  makeGetMeUsecase,
  makePlayerCRUD,
} from '@main/factories';

export function makeCRUDGetMyPlayerUsecase(): GetMyPlayerUsecase {
  const getMe = makeGetMeUsecase();
  const playerCRUD = makePlayerCRUD();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new CRUDGetMyPlayerUsecase({
    getMe,
    playerCRUD,
    fetchPlayerPublisher,
  });
}
