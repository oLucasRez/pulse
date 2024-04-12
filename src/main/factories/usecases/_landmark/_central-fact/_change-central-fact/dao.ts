import { ChangeCentralFactUsecase } from '@domain/usecases';

import { DAOChangeCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeChangeCentralFactPublisher,
  makeGetCentralFactUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeDAOChangeCentralFactUsecase(): ChangeCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const changeCentralFactPublisher = makeChangeCentralFactPublisher();
  const getCentralFact = makeGetCentralFactUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new DAOChangeCentralFactUsecase({
    centralFactDAO,
    changeCentralFactPublisher,
    getCentralFact,
    nextGameState,
  });
}
