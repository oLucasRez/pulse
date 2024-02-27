import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makeDatabaseSetPlayerDiceUsecase } from './database';

export function makeSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  return makeDatabaseSetPlayerDiceUsecase();
}
