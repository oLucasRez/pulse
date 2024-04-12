import { IWatchSubjectPulsesUsecase } from '@domain/usecases';

import { WatchSubjectPulsesUsecase } from '@data/usecases';

import {
  makeFetchSubjectPulsesPublisher,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeWatchSubjectPulsesUsecase(): IWatchSubjectPulsesUsecase {
  const fetchSubjectPulsesPublisher = makeFetchSubjectPulsesPublisher();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new WatchSubjectPulsesUsecase({
    fetchSubjectPulsesPublisher,
    subjectPulseDAO,
  });
}
