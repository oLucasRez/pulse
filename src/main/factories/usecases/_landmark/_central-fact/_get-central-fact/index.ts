import { IGetCentralFactUsecase } from '@domain/usecases';

import { GetCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeFetchCentralFactPublisher,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeGetCentralFactUsecase(): IGetCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const fetchCentralFactPublisher = makeFetchCentralFactPublisher();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new GetCentralFactUsecase({
    centralFactDAO,
    fetchCentralFactPublisher,
    getCentralPulse,
  });
}
