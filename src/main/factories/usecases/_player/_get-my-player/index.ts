import { GetMyPlayerUsecase } from '@domain/usecases';

import { makeDAOGetMyPlayerUsecase } from './dao';

export function makeGetMyPlayerUsecase(): GetMyPlayerUsecase {
  return makeDAOGetMyPlayerUsecase();
}
