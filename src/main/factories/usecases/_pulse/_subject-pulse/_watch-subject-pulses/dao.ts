import { WatchSubjectPulsesUsecase } from '@domain/usecases';

import { DAOWatchSubjectPulsesUsecase } from '@data/usecases';

import {
  makeFetchSubjectPulsesPublisher,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeDAOWatchSubjectPulsesUsecase(): WatchSubjectPulsesUsecase {
  const fetchSubjectPulsesPublisher = makeFetchSubjectPulsesPublisher();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new DAOWatchSubjectPulsesUsecase({
    fetchSubjectPulsesPublisher,
    subjectPulseDAO,
  });
}
