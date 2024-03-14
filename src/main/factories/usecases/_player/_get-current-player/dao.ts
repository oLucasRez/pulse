import { GetCurrentPlayerUsecase } from '@domain/usecases';

import { DAOGetCurrentPlayerUsecase } from '@data/usecases';

import {
  makeFetchPlayerPublisher,
  makeGetPlayerUsecase,
  makeGetRoundUsecase,
} from '@main/factories';

export function makeDAOGetCurrentPlayerUsecase(): GetCurrentPlayerUsecase {
  const getPlayer = makeGetPlayerUsecase();
  const getRound = makeGetRoundUsecase();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new DAOGetCurrentPlayerUsecase({
    getPlayer,
    getRound,
    fetchPlayerPublisher,
  });
}
