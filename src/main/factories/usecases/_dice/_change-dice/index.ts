import { IChangeDiceUsecase } from '@domain/usecases';

import { ChangeDiceUsecase } from '@data/usecases';

import {
  makeDiceDAO,
  makeDiceHydrator,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeChangeDiceUsecase(): IChangeDiceUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new ChangeDiceUsecase({
    diceDAO,
    diceHydrator,
    getDice,
    getPlayer,
  });
}
