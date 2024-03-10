import { GetMyPlayerUsecase } from '@domain/usecases';

import { makeDAOGetMyPlayerUsecase } from './crud';

export function makeGetMyPlayerUsecase(): GetMyPlayerUsecase {
  return makeDAOGetMyPlayerUsecase();
}
