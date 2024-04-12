import { ICreateSubjectUsecase } from '@domain/usecases';

import { CreateSubjectUsecase } from '@data/usecases';

import {
  makeCreateSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeCreateSubjectUsecase(): ICreateSubjectUsecase {
  const createSubjectPublisher = makeCreateSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();

  return new CreateSubjectUsecase({
    createSubjectPublisher,
    getMyPlayer,
    subjectDAO,
  });
}
