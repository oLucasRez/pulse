import { IGetMySubjectUsecase } from '@domain/usecases';

import { GetMySubjectUsecase } from '@data/usecases';

import {
  makeFetchSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeGetMySubjectUsecase(): IGetMySubjectUsecase {
  const fetchSubjectPublisher = makeFetchSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();

  return new GetMySubjectUsecase({
    fetchSubjectPublisher,
    getMyPlayer,
    subjectDAO,
  });
}
