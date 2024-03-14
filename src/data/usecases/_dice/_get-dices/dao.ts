import { DiceModel } from '@domain/models';
import { GetDicesUsecase } from '@domain/usecases';

import { DiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';

export class DAOGetDicesUsecase implements GetDicesUsecase {
  private readonly diceDAO: DiceDAO;

  public constructor(deps: DAOGetDicesUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
  }

  public async execute(): Promise<DiceModel[]> {
    const diceDTOs = await this.diceDAO.read();

    return diceDTOs.map(DiceHydrator.hydrate);
  }
}

export namespace DAOGetDicesUsecase {
  export type Deps = {
    diceDAO: DiceDAO;
  };
}
