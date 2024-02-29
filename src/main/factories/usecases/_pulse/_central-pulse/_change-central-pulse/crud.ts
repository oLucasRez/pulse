import { CRUDChangeCentralPulseUsecase } from '@data/usecases';
import { ChangeCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulseCRUD,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeCRUDChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  const centralPulseCRUD = makeCentralPulseCRUD();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new CRUDChangeCentralPulseUsecase({
    centralPulseCRUD,
    getCentralPulse,
  });
}
