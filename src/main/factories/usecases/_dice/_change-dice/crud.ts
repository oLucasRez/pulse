import { CRUDChangeDiceUsecase } from '@data/usecases';
import { ChangeDiceUsecase } from '@domain/usecases';

import {
  makeDiceCRUD,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeCRUDChangeDiceUsecase(): ChangeDiceUsecase {
  const diceCRUD = makeDiceCRUD();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new CRUDChangeDiceUsecase({ diceCRUD, getDice, getPlayer });
}
