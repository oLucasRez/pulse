import { IRollDiceUsecase } from '@domain/usecases';

import { RollDiceUsecase } from '@data/usecases';

import {
  makeChangeCentralPulseUsecase,
  makeChangeDicePublisher,
  makeChangeDiceUsecase,
  makeGetCurrentGameUsecase,
  makeGetDiceUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeRollDiceUsecase(): IRollDiceUsecase {
  const changeCentralPulse = makeChangeCentralPulseUsecase();
  const changeDice = makeChangeDiceUsecase();
  const changeDicePublisher = makeChangeDicePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getDice = makeGetDiceUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new RollDiceUsecase({
    changeCentralPulse,
    changeDice,
    changeDicePublisher,
    getCurrentGame,
    getDice,
    nextGameState,
  });
}
