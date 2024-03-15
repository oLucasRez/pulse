import { ChangeCentralFactUsecase } from '@domain/usecases';

import { DAOChangeCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeChangeCentralFactPublisher,
  makeGetCentralFactUsecase,
} from '@main/factories';

export function makeDAOChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const changeCentralFactPublisher = makeChangeCentralFactPublisher();
  const getCentralFact = makeGetCentralFactUsecase();

  return new DAOChangeCentralFactUsecase({
    centralFactDAO,
    changeCentralFactPublisher,
    getCentralFact,
  });
}
