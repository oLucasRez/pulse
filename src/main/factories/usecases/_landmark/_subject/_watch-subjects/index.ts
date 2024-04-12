import { IWatchSubjectsUsecase } from '@domain/usecases';

import { WatchSubjectsUsecase } from '@data/usecases';

import { makeFetchSubjectsPublisher, makeSubjectDAO } from '@main/factories';

export function makeWatchSubjectsUsecase(): IWatchSubjectsUsecase {
  const fetchSubjectsPublisher = makeFetchSubjectsPublisher();
  const subjectDAO = makeSubjectDAO();

  return new WatchSubjectsUsecase({
    fetchSubjectsPublisher,
    subjectDAO,
  });
}
