import { DiceModel } from '@domain/models';
import { IGetDiceUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class GetDiceUsecase implements IGetDiceUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ diceDAO, diceHydrator }: Deps) {
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(id: string): Promise<DiceModel | null> {
    const dto = await this.diceDAO.getByID(id);

    const dice = dto ? await this.diceHydrator.hydrate(dto) : null;

    return dice;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
