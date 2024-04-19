import { ForbiddenError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import { ICreateDiceUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class CreateDiceUsecase implements ICreateDiceUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ diceDAO, diceHydrator }: Deps) {
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(
    payload: ICreateDiceUsecase.Payload,
  ): Promise<DiceModel> {
    const { sides, ownerID } = payload;

    if (![4, 6, 8, 10, 12].includes(sides))
      throw new ForbiddenError({
        message: `Dice must have 4, 6, 8, 10 or 12 sides; got ${sides}`,
        metadata: { prop: 'sides', value: sides },
      });

    const dto = await this.diceDAO.create({
      sides,
      value: null,
      ownerID,
    });

    const dice = await this.diceHydrator.hydrate(dto);

    return dice;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
