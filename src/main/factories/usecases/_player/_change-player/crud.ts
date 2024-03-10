import { ChangePlayerUsecase } from '@domain/usecases';

import { DAOChangePlayerUsecase } from '@data/usecases';

import {
  makeChangePlayerPublisher,
  makeGetMyPlayerUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeDAOChangePlayerUsecase(): ChangePlayerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerDAO = makePlayerDAO();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new DAOChangePlayerUsecase({
    getMyPlayer,
    playerDAO,
    changePlayerPublisher,
  });
}
