import { IChangeCentralPulseUsecase } from '@domain/usecases';

import { ChangeCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeChangeCentralPulsePublisher,
  makeGetCentralPulseUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeChangeCentralPulseUsecase(): IChangeCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const changeCentralPulsePublisher = makeChangeCentralPulsePublisher();
  const getCentralPulse = makeGetCentralPulseUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new ChangeCentralPulseUsecase({
    centralPulseDAO,
    changeCentralPulsePublisher,
    getCentralPulse,
    nextGameState,
  });
}
