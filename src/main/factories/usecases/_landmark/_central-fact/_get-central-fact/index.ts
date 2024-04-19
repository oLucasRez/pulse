import { IGetCentralFactUsecase } from '@domain/usecases';

import { GetCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeCentralFactHydrator,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeGetCentralFactUsecase(): IGetCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const centralFactHydrator = makeCentralFactHydrator();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new GetCentralFactUsecase({
    centralFactDAO,
    centralFactHydrator,
    getCentralPulse,
  });
}
