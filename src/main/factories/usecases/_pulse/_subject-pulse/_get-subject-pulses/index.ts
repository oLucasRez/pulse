import { IGetSubjectPulsesUsecase } from '@domain/usecases';

import { GetSubjectPulsesUsecase } from '@data/usecases';

import {
  makeFetchSubjectPulsesPublisher,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeGetSubjectPulsesUsecase(): IGetSubjectPulsesUsecase {
  const fetchSubjectPulsesPublisher = makeFetchSubjectPulsesPublisher();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new GetSubjectPulsesUsecase({
    fetchSubjectPulsesPublisher,
    subjectPulseDAO,
  });
}
