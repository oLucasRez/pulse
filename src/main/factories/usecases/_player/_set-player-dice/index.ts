import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makeCRUDSetPlayerDiceUsecase } from './crud';

export function makeSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  return makeCRUDSetPlayerDiceUsecase();
}
