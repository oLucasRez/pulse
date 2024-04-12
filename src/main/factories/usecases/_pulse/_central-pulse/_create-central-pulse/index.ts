import { ICreateCentralPulseUsecase } from '@domain/usecases';

import { CreateCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeCreateCentralFactUsecase,
  makeCreateCentralPulsePublisher,
} from '@main/factories';

export function makeCreateCentralPulseUsecase(): ICreateCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const createCentralFact = makeCreateCentralFactUsecase();
  const createCentralPulsePublisher = makeCreateCentralPulsePublisher();

  return new CreateCentralPulseUsecase({
    centralPulseDAO,
    createCentralFact,
    createCentralPulsePublisher,
  });
}
