import { IGetMyPlayerUsecase } from '@domain/usecases';

import { GetMyPlayerUsecase } from '@data/usecases';

import {
  makeGetMeUsecase,
  makePlayerDAO,
  makePlayerHydrator,
} from '@main/factories';

export function makeGetMyPlayerUsecase(): IGetMyPlayerUsecase {
  const getMe = makeGetMeUsecase();
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new GetMyPlayerUsecase({
    getMe,
    playerDAO,
    playerHydrator,
  });
}
