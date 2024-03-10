import { ChangeCentralFactUsecase } from '@domain/usecases';

import { DAOChangeCentralFactUsecase } from '@data/usecases';

import { makeCentralFactDAO, makeGetCentralFactUsecase } from '@main/factories';

export function makeDAOChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const getCentralFact = makeGetCentralFactUsecase();

  return new DAOChangeCentralFactUsecase({
    centralFactDAO,
    getCentralFact,
  });
}
