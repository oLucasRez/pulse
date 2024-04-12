import { IGetMyPlayerUsecase } from '@domain/usecases';

import { GetMyPlayerUsecase } from '@data/usecases';

import {
  makeFetchPlayerPublisher,
  makeGetMeUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeGetMyPlayerUsecase(): IGetMyPlayerUsecase {
  const getMe = makeGetMeUsecase();
  const playerDAO = makePlayerDAO();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new GetMyPlayerUsecase({
    getMe,
    playerDAO,
    fetchPlayerPublisher,
  });
}
