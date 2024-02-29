import { CRUDCreateCentralPulseUsecase } from '@data/usecases';
import { CreateCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulseCRUD,
  makeCreateCentralFactUsecase,
} from '@main/factories';

export function makeCRUDCreateCentralPulseUsecase(): CreateCentralPulseUsecase {
  const centralPulseCRUD = makeCentralPulseCRUD();
  const createCentralFact = makeCreateCentralFactUsecase();

  return new CRUDCreateCentralPulseUsecase({
    centralPulseCRUD,
    createCentralFact,
  });
}
