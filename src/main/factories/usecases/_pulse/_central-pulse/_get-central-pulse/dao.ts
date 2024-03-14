import { GetCentralPulseUsecase } from '@domain/usecases';

import { DAOGetCentralPulseUsecase } from '@data/usecases';

import { makeCentralPulseDAO } from '@main/factories';

export function makeDAOGetCentralPulseUsecase(): GetCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();

  return new DAOGetCentralPulseUsecase({ centralPulseDAO });
}
