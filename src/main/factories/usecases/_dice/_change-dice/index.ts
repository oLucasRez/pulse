import { ChangeDice } from '@data/usecases';
import { ChangeDiceUsecase } from '@domain/usecases';

import {
  makeDiceCRUD,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeChangeDiceUsecase(): ChangeDiceUsecase {
  const diceCRUD = makeDiceCRUD();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new ChangeDice({ diceCRUD, getDice, getPlayer });
}
