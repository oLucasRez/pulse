import { GetCentralFactUsecase } from '@domain/usecases';

import { DAOGetCentralFactUsecase } from '@data/usecases';

import { makeCentralFactDAO } from '@main/factories';

export function makeDAOGetCentralFactUsecase(): GetCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();

  return new DAOGetCentralFactUsecase({ centralFactDAO });
}
