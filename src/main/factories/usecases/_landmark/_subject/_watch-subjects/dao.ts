import { WatchSubjectsUsecase } from '@domain/usecases';

import { DAOWatchSubjectsUsecase } from '@data/usecases';

import { makeFetchSubjectsPublisher, makeSubjectDAO } from '@main/factories';

export function makeDAOWatchSubjectsUsecase(): WatchSubjectsUsecase {
  const fetchSubjectsPublisher = makeFetchSubjectsPublisher();
  const subjectDAO = makeSubjectDAO();

  return new DAOWatchSubjectsUsecase({
    fetchSubjectsPublisher,
    subjectDAO,
  });
}
