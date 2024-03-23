import { GetCentralPulseUsecase } from '@domain/usecases';

import { DAOGetCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeFetchCentralPulsePublisher,
} from '@main/factories';

export function makeDAOGetCentralPulseUsecase(): GetCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const fetchCentralPulsePublisher = makeFetchCentralPulsePublisher();

  return new DAOGetCentralPulseUsecase({
    centralPulseDAO,
    fetchCentralPulsePublisher,
  });
}
