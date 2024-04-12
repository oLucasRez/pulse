import { IChangePlayerUsecase } from '@domain/usecases';

import { ChangePlayerUsecase } from '@data/usecases';

import {
  makeChangePlayerPublisher,
  makeGetMyPlayerUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeChangePlayerUsecase(): IChangePlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerDAO = makePlayerDAO();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new ChangePlayerUsecase({
    getMyPlayer,
    playerDAO,
    changePlayerPublisher,
  });
}
