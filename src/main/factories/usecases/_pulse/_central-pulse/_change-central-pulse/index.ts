import { IChangeCentralPulseUsecase } from '@domain/usecases';

import { ChangeCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeCentralPulseHydrator,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeChangeCentralPulseUsecase(): IChangeCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const centralPulseHydrator = makeCentralPulseHydrator();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new ChangeCentralPulseUsecase({
    centralPulseDAO,
    centralPulseHydrator,
    getCentralPulse,
  });
}
