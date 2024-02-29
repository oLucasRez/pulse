import { CRUDChangeCentralFactUsecase } from '@data/usecases';
import { ChangeCentralFactUsecase } from '@domain/usecases';

import {
  makeCentralFactCRUD,
  makeGetCentralFactUsecase,
} from '@main/factories';

export function makeCRUDChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  const centralFactCRUD = makeCentralFactCRUD();
  const getCentralFact = makeGetCentralFactUsecase();

  return new CRUDChangeCentralFactUsecase({
    centralFactCRUD,
    getCentralFact,
  });
}
