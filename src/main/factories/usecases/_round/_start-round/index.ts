import { IStartRoundUsecase } from '@domain/usecases';

import { StartRoundUsecase } from '@data/usecases';

import {
  makeChangeRoundPublisher,
  makeGetRoundUsecase,
  makeRoundDAO,
} from '@main/factories';

export function makeStartRoundUsecase(): IStartRoundUsecase {
  const changeRoundPublisher = makeChangeRoundPublisher();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();

  return new StartRoundUsecase({ changeRoundPublisher, getRound, roundDAO });
}
