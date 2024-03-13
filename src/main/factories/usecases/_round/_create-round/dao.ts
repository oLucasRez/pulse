import { CreateRoundUsecase } from '@domain/usecases';

import { DAOCreateRoundUsecase } from '@data/usecases';

import { makeCreateRoundPublisher, makeRoundDAO } from '@main/factories';

export function makeDAOCreateRoundUsecase(): CreateRoundUsecase {
  const createRoundPublisher = makeCreateRoundPublisher();
  const roundDAO = makeRoundDAO();

  return new DAOCreateRoundUsecase({ createRoundPublisher, roundDAO });
}
