import { DiceModel } from '@domain/models';
import { IResetDiceOverloadUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class ResetDiceOverloadUsecase implements IResetDiceOverloadUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ diceDAO, diceHydrator }: Deps) {
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(id: string): Promise<DiceModel> {
    const dto = await this.diceDAO.update(id, {
      value: null,
      overloadCount: 0,
      overloaded: false,
    });

    return this.diceHydrator.hydrate(dto);
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
