import { CreateCentralPulseUsecase } from '@domain/usecases';

import { DAOCreateCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeCreateCentralFactUsecase,
  makeCreateCentralPulsePublisher,
} from '@main/factories';

export function makeDAOCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const createCentralFact = makeCreateCentralFactUsecase();
  const createCentralPulsePublisher = makeCreateCentralPulsePublisher();

  return new DAOCreateCentralPulseUsecase({
    centralPulseDAO,
    createCentralFact,
    createCentralPulsePublisher,
  });
}
