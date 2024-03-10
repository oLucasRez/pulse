import { ChangeCentralPulseUsecase } from '@domain/usecases';

import { DAOChangeCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeDAOChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new DAOChangeCentralPulseUsecase({
    centralPulseDAO,
    getCentralPulse,
  });
}
