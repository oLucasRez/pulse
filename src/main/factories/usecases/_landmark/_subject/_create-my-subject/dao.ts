import { CreateMySubjectUsecase } from '@domain/usecases';

import { DAOCreateMySubjectUsecase } from '@data/usecases';

import {
  makeCreateSubjectPublisher,
  makeCreateSubjectUsecase,
  makeGetCurrentGameUsecase,
  makeGetMyPlayerUsecase,
  makeSetPlayerSubjectUsecase,
} from '@main/factories';

export function makeDAOCreateMySubjectUsecase(): CreateMySubjectUsecase {
  const createSubject = makeCreateSubjectUsecase();
  const createSubjectPublisher = makeCreateSubjectPublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const setPlayerSubject = makeSetPlayerSubjectUsecase();

  return new DAOCreateMySubjectUsecase({
    createSubject,
    createSubjectPublisher,
    getCurrentGame,
    getMyPlayer,
    setPlayerSubject,
  });
}
