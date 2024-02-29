import { CRUDGetCentralFactUsecase } from '@data/usecases';
import { GetCentralFactUsecase } from '@domain/usecases';

import { makeCentralFactCRUD } from '@main/factories';

export function makeCRUDGetCentralFactUsecase(): GetCentralFactUsecase {
  const centralFactCRUD = makeCentralFactCRUD();

  return new CRUDGetCentralFactUsecase({ centralFactCRUD });
}
