import { ChangeDiceUsecase } from '@domain/usecases';

import { DAOChangeDiceUsecase } from '@data/usecases';

import {
  makeChangeDicePublisher,
  makeDiceDAO,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeDAOChangeDiceUsecase(): ChangeDiceUsecase {
  const changeDicePublisher = makeChangeDicePublisher();
  const diceDAO = makeDiceDAO();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new DAOChangeDiceUsecase({
    changeDicePublisher,
    diceDAO,
    getDice,
    getPlayer,
  });
}
