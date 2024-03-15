import { GetCentralFactUsecase } from '@domain/usecases';

import { DAOGetCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeFetchCentralFactPublisher,
} from '@main/factories';

export function makeDAOGetCentralFactUsecase(): GetCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const fetchCentralFactPublisher = makeFetchCentralFactPublisher();

  return new DAOGetCentralFactUsecase({
    centralFactDAO,
    fetchCentralFactPublisher,
  });
}
