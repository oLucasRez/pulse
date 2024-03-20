import { CreateDiceUsecase } from '@domain/usecases';

import { DAOCreateDiceUsecase } from '@data/usecases';

import { makeCreateDicePublisher, makeDiceDAO } from '@main/factories';

export function makeDAOCreateDiceUsecase(): CreateDiceUsecase {
  const createDicePublisher = makeCreateDicePublisher();
  const diceDAO = makeDiceDAO();

  return new DAOCreateDiceUsecase({ createDicePublisher, diceDAO });
}
