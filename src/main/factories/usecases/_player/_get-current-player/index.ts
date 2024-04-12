import { IGetCurrentPlayerUsecase } from '@domain/usecases';

import { GetCurrentPlayerUsecase } from '@data/usecases';

import {
  makeFetchPlayerPublisher,
  makeGetPlayerUsecase,
  makeGetRoundUsecase,
} from '@main/factories';

export function makeGetCurrentPlayerUsecase(): IGetCurrentPlayerUsecase {
  const getPlayer = makeGetPlayerUsecase();
  const getRound = makeGetRoundUsecase();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new GetCurrentPlayerUsecase({
    getPlayer,
    getRound,
    fetchPlayerPublisher,
  });
}
