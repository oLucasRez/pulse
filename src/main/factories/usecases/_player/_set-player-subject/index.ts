import { ISetPlayerSubjectUsecase } from '@domain/usecases';

import { SetPlayerSubjectUsecase } from '@data/usecases';

import {
  makeChangePlayerPublisher,
  makeGetMyPlayerUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeSetPlayerSubjectUsecase(): ISetPlayerSubjectUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const playerDAO = makePlayerDAO();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new SetPlayerSubjectUsecase({
    getMyPlayer,
    playerDAO,
    changePlayerPublisher,
  });
}
