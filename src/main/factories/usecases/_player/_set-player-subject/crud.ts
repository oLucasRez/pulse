import { SetPlayerSubjectUsecase } from '@domain/usecases';

import { DAOSetPlayerSubjectUsecase } from '@data/usecases';

import {
  makeChangePlayerPublisher,
  makeGetMyPlayerUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeDAOSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerDAO = makePlayerDAO();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new DAOSetPlayerSubjectUsecase({
    getMyPlayer,
    playerDAO,
    changePlayerPublisher,
  });
}
