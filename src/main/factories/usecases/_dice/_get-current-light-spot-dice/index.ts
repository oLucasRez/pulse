import { IGetCurrentLightSpotDiceUsecase } from '@domain/usecases';

import { GetCurrentLightSpotDiceUsecase } from '@data/usecases';

import {
  makeDiceDAO,
  makeDiceHydrator,
  makeGetLightSpotRoundUsecase,
} from '@main/factories';

export function makeGetCurrentLightSpotDiceUsecase(): IGetCurrentLightSpotDiceUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();
  const getLightSpotRound = makeGetLightSpotRoundUsecase();

  return new GetCurrentLightSpotDiceUsecase({
    diceDAO,
    diceHydrator,
    getLightSpotRound,
  });
}
