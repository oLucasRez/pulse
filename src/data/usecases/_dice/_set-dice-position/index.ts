import { DiceModel } from '@domain/models';
import { ISetDicePositionUsecase } from '@domain/usecases';
import { Vector } from '@domain/utils';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class SetDicePositionUsecase implements ISetDicePositionUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ diceDAO, diceHydrator }: Deps) {
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(
    id: string,
    position: Vector | null,
  ): Promise<DiceModel> {
    const dto = await this.diceDAO.update(id, {
      position: position && position.toJSON(),
    });

    return this.diceHydrator.hydrate(dto);
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
