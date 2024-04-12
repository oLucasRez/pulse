import { IChangeCentralFactUsecase } from '@domain/usecases';

import { ChangeCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeChangeCentralFactPublisher,
  makeGetCentralFactUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeChangeCentralFactUsecase(): IChangeCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const changeCentralFactPublisher = makeChangeCentralFactPublisher();
  const getCentralFact = makeGetCentralFactUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new ChangeCentralFactUsecase({
    centralFactDAO,
    changeCentralFactPublisher,
    getCentralFact,
    nextGameState,
  });
}
