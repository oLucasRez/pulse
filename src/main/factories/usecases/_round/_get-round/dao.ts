import { GetRoundUsecase } from '@domain/usecases';

import { DAOGetRoundUsecase } from '@data/usecases';

import { makeFetchRoundPublisher, makeRoundDAO } from '@main/factories';

export function makeDAOGetRoundUsecase(): GetRoundUsecase {
  const fetchRoundPublisher = makeFetchRoundPublisher();
  const roundDAO = makeRoundDAO();

  return new DAOGetRoundUsecase({ fetchRoundPublisher, roundDAO });
}
