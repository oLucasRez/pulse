import { ICreateRoundUsecase } from '@domain/usecases';

import { CreateRoundUsecase } from '@data/usecases';

import { makeCreateRoundPublisher, makeRoundDAO } from '@main/factories';

export function makeCreateRoundUsecase(): ICreateRoundUsecase {
  const createRoundPublisher = makeCreateRoundPublisher();
  const roundDAO = makeRoundDAO();

  return new CreateRoundUsecase({ createRoundPublisher, roundDAO });
}
