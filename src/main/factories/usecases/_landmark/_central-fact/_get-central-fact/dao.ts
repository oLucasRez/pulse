import { GetCentralFactUsecase } from '@domain/usecases';

import { DAOGetCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeFetchCentralFactPublisher,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeDAOGetCentralFactUsecase(): GetCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const fetchCentralFactPublisher = makeFetchCentralFactPublisher();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new DAOGetCentralFactUsecase({
    centralFactDAO,
    fetchCentralFactPublisher,
    getCentralPulse,
  });
}
