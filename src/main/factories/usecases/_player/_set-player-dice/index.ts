import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makeDAOSetPlayerDiceUsecase } from './crud';

export function makeSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  return makeDAOSetPlayerDiceUsecase();
}
