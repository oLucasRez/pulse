import { StartRoundUsecase } from '@domain/usecases';

import { DAOStartRoundUsecase } from '@data/usecases';

import {
  makeChangeRoundPublisher,
  makeGetRoundUsecase,
  makeRoundDAO,
} from '@main/factories';

export function makeDAOStartRoundUsecase(): StartRoundUsecase {
  const changeRoundPublisher = makeChangeRoundPublisher();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();

  return new DAOStartRoundUsecase({ changeRoundPublisher, getRound, roundDAO });
}
