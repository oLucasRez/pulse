import { ICreateCentralPulseUsecase } from '@domain/usecases';

import { CreateCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeCentralPulseHydrator,
  makeCreateCentralFactUsecase,
} from '@main/factories';

export function makeCreateCentralPulseUsecase(): ICreateCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const centralPulseHydrator = makeCentralPulseHydrator();
  const createCentralFact = makeCreateCentralFactUsecase();

  return new CreateCentralPulseUsecase({
    centralPulseDAO,
    centralPulseHydrator,
    createCentralFact,
  });
}
