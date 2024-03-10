import { CreateRoundUsecase } from '@domain/usecases';

import { DAOCreateRoundUsecase } from '@data/usecases';

import { makeRoundDAO } from '@main/factories';

export function makeDAOCreateRoundUsecase(): CreateRoundUsecase {
  const roundDAO = makeRoundDAO();

  return new DAOCreateRoundUsecase({ roundDAO });
}
