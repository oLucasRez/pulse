import { GetCurrentDiceUsecase } from '@domain/usecases';

import { DAOGetCurrentDiceUsecase } from '@data/usecases';

import {
  makeFetchDicePublisher,
  makeGetCurrentPlayerUsecase,
  makeGetDiceUsecase,
} from '@main/factories';

export function makeDAOGetCurrentDiceUsecase(): GetCurrentDiceUsecase {
  const fetchDicePublisher = makeFetchDicePublisher();
  const getCurrentPlayer = makeGetCurrentPlayerUsecase();
  const getDice = makeGetDiceUsecase();

  return new DAOGetCurrentDiceUsecase({
    fetchDicePublisher,
    getCurrentPlayer,
    getDice,
  });
}
