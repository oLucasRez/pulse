import { IRollCurrentDiceUsecase } from '@domain/usecases';

import { RollCurrentDiceUsecase } from '@data/usecases';

import {
  makeChangeCentralPulseUsecase,
  makeDiceDAO,
  makeDiceHydrator,
  makeGetCurrentDiceUsecase,
  makeGetCurrentGameUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeRollCurrentDiceUsecase(): IRollCurrentDiceUsecase {
  const changeCentralPulse = makeChangeCentralPulseUsecase();
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();
  const getCurrentDice = makeGetCurrentDiceUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new RollCurrentDiceUsecase({
    changeCentralPulse,
    diceDAO,
    diceHydrator,
    getCurrentDice,
    getCurrentGame,
    nextGameState,
  });
}
