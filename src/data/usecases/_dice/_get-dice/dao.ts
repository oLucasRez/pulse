import { DiceModel } from '@domain/models';
import { GetDiceUsecase } from '@domain/usecases';

import { DiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';

export class DAOGetDiceUsecase implements GetDiceUsecase {
  private readonly diceDAO: DiceDAO;

  public constructor(deps: DAOGetDiceUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
  }

  public async execute(id: string): Promise<DiceModel | null> {
    const diceDTO = await this.diceDAO.read(id);

    return diceDTO ? DiceHydrator.hydrate(diceDTO) : null;
  }
}

export namespace DAOGetDiceUsecase {
  export type Deps = {
    diceDAO: DiceDAO;
  };
}
