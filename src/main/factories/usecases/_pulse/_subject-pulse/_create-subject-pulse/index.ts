import { ICreateSubjectPulseUsecase } from '@domain/usecases';

import { CreateSubjectPulseUsecase } from '@data/usecases';

import {
  makeNextGameStateUsecase,
  makeSubjectPulseDAO,
  makeSubjectPulseHydrator,
} from '@main/factories';

export function makeCreateSubjectPulseUsecase(): ICreateSubjectPulseUsecase {
  const nextGameState = makeNextGameStateUsecase();
  const subjectPulseDAO = makeSubjectPulseDAO();
  const subjectPulseHydrator = makeSubjectPulseHydrator();

  return new CreateSubjectPulseUsecase({
    nextGameState,
    subjectPulseDAO,
    subjectPulseHydrator,
  });
}
