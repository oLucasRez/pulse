import { RollDiceUsecase } from '@domain/usecases';

import { makeDAORollDiceUsecase } from './dao';

export function makeRollDiceUsecase(): RollDiceUsecase {
  return makeDAORollDiceUsecase();
}
