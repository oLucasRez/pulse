import { RollDiceUsecase } from '@domain/usecases';

import { DAORollDiceUsecase } from '@data/usecases';

import {
  makeChangeCentralPulseUsecase,
  makeChangeDicePublisher,
  makeChangeDiceUsecase,
  makeGetCurrentGameUsecase,
  makeGetDiceUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeDAORollDiceUsecase(): RollDiceUsecase {
  const changeCentralPulse = makeChangeCentralPulseUsecase();
  const changeDice = makeChangeDiceUsecase();
  const changeDicePublisher = makeChangeDicePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getDice = makeGetDiceUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new DAORollDiceUsecase({
    changeCentralPulse,
    changeDice,
    changeDicePublisher,
    getCurrentGame,
    getDice,
    nextGameState,
  });
}
