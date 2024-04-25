import { IGetCurrentDiceUsecase } from '@domain/usecases';

import { GetCurrentDiceUsecase } from '@data/usecases';

import {
  makeDiceDAO,
  makeDiceHydrator,
  makeGetRoundUsecase,
} from '@main/factories';

export function makeGetCurrentDiceUsecase(): IGetCurrentDiceUsecase {
  const diceDAO = makeDiceDAO();
  const diceHidrator = makeDiceHydrator();
  const getRound = makeGetRoundUsecase();

  return new GetCurrentDiceUsecase({ diceDAO, diceHidrator, getRound });
}
