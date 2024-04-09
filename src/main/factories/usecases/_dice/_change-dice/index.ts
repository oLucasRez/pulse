import { IChangeDiceUsecase } from '@domain/usecases';

import { ChangeDiceUsecase } from '@data/usecases';

import {
  makeChangeDicePublisher,
  makeDiceDAO,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeChangeDiceUsecase(): IChangeDiceUsecase {
  const changeDicePublisher = makeChangeDicePublisher();
  const diceDAO = makeDiceDAO();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new ChangeDiceUsecase({
    changeDicePublisher,
    diceDAO,
    getDice,
    getPlayer,
  });
}
