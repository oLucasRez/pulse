import { GetMyPlayerUsecase } from '@domain/usecases';

import { makeCRUDGetMyPlayerUsecase } from './crud';

export function makeGetMyPlayerUsecase(): GetMyPlayerUsecase {
  return makeCRUDGetMyPlayerUsecase();
}
