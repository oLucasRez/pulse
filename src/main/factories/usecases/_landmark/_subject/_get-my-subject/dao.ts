import { GetMySubjectUsecase } from '@domain/usecases';

import { DAOGetMySubjectUsecase } from '@data/usecases';

import {
  makeFetchSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeDAOGetMySubjectUsecase(): GetMySubjectUsecase {
  const fetchSubjectPublisher = makeFetchSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const subjectDAO = makeSubjectDAO();

  return new DAOGetMySubjectUsecase({
    fetchSubjectPublisher,
    getMyPlayer,
    subjectDAO,
  });
}
