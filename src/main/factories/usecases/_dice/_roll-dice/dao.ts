import { RollDiceUsecase } from '@domain/usecases';

import { DAORollDiceUsecase } from '@data/usecases';

import {
  makeChangeDicePublisher,
  makeChangeDiceUsecase,
  makeGetDiceUsecase,
} from '@main/factories';

export function makeDAORollDiceUsecase(): RollDiceUsecase {
  const changeDice = makeChangeDiceUsecase();
  const changeDicePublisher = makeChangeDicePublisher();
  const getDice = makeGetDiceUsecase();

  return new DAORollDiceUsecase({ changeDice, changeDicePublisher, getDice });
}
