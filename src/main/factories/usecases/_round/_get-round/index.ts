import { IGetRoundUsecase } from '@domain/usecases';

import { GetRoundUsecase } from '@data/usecases';

import { makeFetchRoundPublisher, makeRoundDAO } from '@main/factories';

export function makeGetRoundUsecase(): IGetRoundUsecase {
  const fetchRoundPublisher = makeFetchRoundPublisher();
  const roundDAO = makeRoundDAO();

  return new GetRoundUsecase({ fetchRoundPublisher, roundDAO });
}
