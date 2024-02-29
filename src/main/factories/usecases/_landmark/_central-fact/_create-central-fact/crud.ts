import { CRUDCreateCentralFactUsecase } from '@data/usecases';
import { CreateCentralFactUsecase } from '@domain/usecases';

import { makeCentralFactCRUD } from '@main/factories';

export function makeCRUDCreateCentralFactUsecase(): CreateCentralFactUsecase {
  const centralFactCRUD = makeCentralFactCRUD();

  return new CRUDCreateCentralFactUsecase({
    centralFactCRUD,
  });
}
