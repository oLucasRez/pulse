import { CRUDGetCurrentPlayerUsecase } from '@data/usecases';
import { GetCurrentPlayerUsecase } from '@domain/usecases';

import {
  makeFetchPlayerPublisher,
  makeGetPlayerUsecase,
  makeGetRoundUsecase,
} from '@main/factories';

export function makeCRUDGetCurrentPlayerUsecase(): GetCurrentPlayerUsecase {
  const getPlayer = makeGetPlayerUsecase();
  const getRound = makeGetRoundUsecase();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new CRUDGetCurrentPlayerUsecase({
    getPlayer,
    getRound,
    fetchPlayerPublisher,
  });
}
