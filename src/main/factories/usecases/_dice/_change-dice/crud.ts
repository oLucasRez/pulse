import { ChangeDiceUsecase } from '@domain/usecases';

import { DAOChangeDiceUsecase } from '@data/usecases';

import {
  makeDiceDAO,
  makeGetDiceUsecase,
  makeGetPlayerUsecase,
} from '@main/factories';

export function makeDAOChangeDiceUsecase(): ChangeDiceUsecase {
  const diceDAO = makeDiceDAO();
  const getDice = makeGetDiceUsecase();
  const getPlayer = makeGetPlayerUsecase();

  return new DAOChangeDiceUsecase({ diceDAO, getDice, getPlayer });
}
