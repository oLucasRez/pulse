import { CreateSubjectUsecase } from '@domain/usecases';

import { DAOCreateSubjectUsecase } from '@data/usecases';

import {
  makeCreateSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeDAOCreateSubjectUsecase(): CreateSubjectUsecase {
  const createSubjectPublisher = makeCreateSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();

  return new DAOCreateSubjectUsecase({
    createSubjectPublisher,
    getMyPlayer,
    subjectDAO,
  });
}
