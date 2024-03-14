import { CreateCentralFactUsecase } from '@domain/usecases';

import { DAOCreateCentralFactUsecase } from '@data/usecases';

import { makeCentralFactDAO } from '@main/factories';

export function makeDAOCreateCentralFactUsecase(): CreateCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();

  return new DAOCreateCentralFactUsecase({
    centralFactDAO,
  });
}
