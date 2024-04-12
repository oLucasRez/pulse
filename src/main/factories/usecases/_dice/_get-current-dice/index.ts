import { IGetCurrentDiceUsecase } from '@domain/usecases';

import { GetCurrentDiceUsecase } from '@data/usecases';

import {
  makeFetchDicePublisher,
  makeGetCurrentPlayerUsecase,
  makeGetDiceUsecase,
} from '@main/factories';

export function makeGetCurrentDiceUsecase(): IGetCurrentDiceUsecase {
  const fetchDicePublisher = makeFetchDicePublisher();
  const getCurrentPlayer = makeGetCurrentPlayerUsecase();
  const getDice = makeGetDiceUsecase();

  return new GetCurrentDiceUsecase({
    fetchDicePublisher,
    getCurrentPlayer,
    getDice,
  });
}
