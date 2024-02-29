import { CRUDGetCentralPulseUsecase } from '@data/usecases';
import { GetCentralPulseUsecase } from '@domain/usecases';

import { makeCentralPulseCRUD } from '@main/factories';

export function makeCRUDGetCentralPulseUsecase(): GetCentralPulseUsecase {
  const centralPulseCRUD = makeCentralPulseCRUD();

  return new CRUDGetCentralPulseUsecase({ centralPulseCRUD });
}
