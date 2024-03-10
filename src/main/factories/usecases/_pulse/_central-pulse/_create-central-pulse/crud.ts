import { CreateCentralPulseUsecase } from '@domain/usecases';

import { DAOCreateCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeCreateCentralFactUsecase,
} from '@main/factories';

export function makeDAOCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const createCentralFact = makeCreateCentralFactUsecase();

  return new DAOCreateCentralPulseUsecase({
    centralPulseDAO,
    createCentralFact,
  });
}
