import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makeDAOSetPlayerDiceUsecase } from './dao';

export function makeSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  return makeDAOSetPlayerDiceUsecase();
}
