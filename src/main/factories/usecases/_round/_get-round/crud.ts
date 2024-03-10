import { GetRoundUsecase } from '@domain/usecases';

import { DAOGetRoundUsecase } from '@data/usecases';

import { makeRoundDAO } from '@main/factories';

export function makeDAOGetRoundUsecase(): GetRoundUsecase {
  const roundDAO = makeRoundDAO();

  return new DAOGetRoundUsecase({ roundDAO });
}
