import { IWatchSubjectsUsecase } from '@domain/usecases';

import { WatchSubjectsUsecase } from '@data/usecases';

import { makeSubjectDAO, makeSubjectHydrator } from '@main/factories';

export function makeWatchSubjectsUsecase(): IWatchSubjectsUsecase {
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new WatchSubjectsUsecase({
    subjectDAO,
    subjectHydrator,
  });
}
