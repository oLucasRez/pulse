import { ISetPlayerDiceUsecase } from '@domain/usecases';

import { SetPlayerDiceUsecase } from '@data/usecases';

import { makeChangePlayerPublisher, makePlayerDAO } from '@main/factories';

export function makeSetPlayerDiceUsecase(): ISetPlayerDiceUsecase {
  const playerDAO = makePlayerDAO();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new SetPlayerDiceUsecase({
    playerDAO,
    changePlayerPublisher,
  });
}
