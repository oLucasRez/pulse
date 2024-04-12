import { ICreateDiceUsecase } from '@domain/usecases';

import { CreateDiceUsecase } from '@data/usecases';

import { makeCreateDicePublisher, makeDiceDAO } from '@main/factories';

export function makeCreateDiceUsecase(): ICreateDiceUsecase {
  const createDicePublisher = makeCreateDicePublisher();
  const diceDAO = makeDiceDAO();

  return new CreateDiceUsecase({ createDicePublisher, diceDAO });
}
