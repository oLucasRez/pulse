import { IChangeCentralFactUsecase } from '@domain/usecases';

import { ChangeCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeCentralFactHydrator,
  makeGetCentralFactUsecase,
  makeGetCurrentGameUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeChangeCentralFactUsecase(): IChangeCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const centralFactHydrator = makeCentralFactHydrator();
  const getCentralFact = makeGetCentralFactUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new ChangeCentralFactUsecase({
    centralFactDAO,
    centralFactHydrator,
    getCentralFact,
    getCurrentGame,
    nextGameState,
  });
}
