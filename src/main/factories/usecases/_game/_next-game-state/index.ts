import { NextGameStateUsecase } from '@domain/usecases';

import { makeDAONextGameStateUsecase } from './dao';

export function makeNextGameStateUsecase(): NextGameStateUsecase {
  return makeDAONextGameStateUsecase();
}
