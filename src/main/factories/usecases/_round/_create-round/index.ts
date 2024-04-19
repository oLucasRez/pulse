import { ICreateRoundUsecase } from '@domain/usecases';

import { CreateRoundUsecase } from '@data/usecases';

import { makeRoundDAO, makeRoundHydrator } from '@main/factories';

export function makeCreateRoundUsecase(): ICreateRoundUsecase {
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new CreateRoundUsecase({
    roundDAO,
    roundHydrator,
  });
}
