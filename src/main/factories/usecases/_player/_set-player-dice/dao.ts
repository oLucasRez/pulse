import { SetPlayerDiceUsecase } from '@domain/usecases';

import { DAOSetPlayerDiceUsecase } from '@data/usecases';

import { makeChangePlayerPublisher, makePlayerDAO } from '@main/factories';

export function makeDAOSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  const playerDAO = makePlayerDAO();
  const changePlayerPublisher = makeChangePlayerPublisher();

  return new DAOSetPlayerDiceUsecase({
    playerDAO,
    changePlayerPublisher,
  });
}
