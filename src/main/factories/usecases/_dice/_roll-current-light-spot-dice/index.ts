import { IRollCurrentLightSpotDiceUsecase } from '@domain/usecases';

import { RollCurrentLightSpotDiceUsecase } from '@data/usecases';

import {
  makeCreateLightSpotUsecase,
  makeDiceDAO,
  makeDiceHydrator,
  makeGetCurrentLightSpotDiceUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeRollCurrentLightSpotDiceUsecase(): IRollCurrentLightSpotDiceUsecase {
  const createLightSpot = makeCreateLightSpotUsecase();
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();
  const getCurrentLightSpotDice = makeGetCurrentLightSpotDiceUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new RollCurrentLightSpotDiceUsecase({
    createLightSpot,
    diceDAO,
    diceHydrator,
    getCurrentLightSpotDice,
    nextGameState,
  });
}
