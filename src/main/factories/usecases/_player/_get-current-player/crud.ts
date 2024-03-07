import { CRUDGetCurrentPlayerUsecase } from '@data/usecases';
import { GetCurrentPlayerUsecase } from '@domain/usecases';

import {
  makeGetPlayerUsecase,
  makeGetRoundUsecase,
  makePlayerPublisher,
} from '@main/factories';

export function makeCRUDGetCurrentPlayerUsecase(): GetCurrentPlayerUsecase {
  const getPlayer = makeGetPlayerUsecase();
  const getRound = makeGetRoundUsecase();
  const playerPublisher = makePlayerPublisher();

  return new CRUDGetCurrentPlayerUsecase({
    getPlayer,
    getRound,
    playerPublisher,
  });
}
