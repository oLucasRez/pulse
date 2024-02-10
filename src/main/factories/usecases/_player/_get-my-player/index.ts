import { GetMyPlayerUsecase } from '@domain/usecases';

import { makeDatabaseGetMyPlayerUsecase } from './database';

export function makeGetMyPlayerUsecase(): GetMyPlayerUsecase {
  return makeDatabaseGetMyPlayerUsecase();
}
