import { IGetSubjectPulseUsecase } from '@domain/usecases';

import { GetSubjectPulseUsecase } from '@data/usecases';

import {
  makeFetchSubjectPulsePublisher,
  makeSubjectPulseDAO,
} from '@main/factories';

export function makeGetSubjectPulseUsecase(): IGetSubjectPulseUsecase {
  const fetchSubjectPulsePublisher = makeFetchSubjectPulsePublisher();
  const subjectPulseDAO = makeSubjectPulseDAO();

  return new GetSubjectPulseUsecase({
    fetchSubjectPulsePublisher,
    subjectPulseDAO,
  });
}
