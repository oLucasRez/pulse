import { ForbiddenError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import { CreateDiceUsecase } from '@domain/usecases';

import { DiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';

export class DAOCreateDiceUsecase implements CreateDiceUsecase {
  private readonly diceDAO: DiceDAO;

  public constructor(deps: DAOCreateDiceUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
  }

  public async execute(payload: CreateDiceUsecase.Payload): Promise<DiceModel> {
    const { sides } = payload;

    if (![4, 6, 8, 10, 12].includes(sides))
      throw new ForbiddenError({
        message: `Dice must have 4, 6, 8, 10 or 12 sides; got ${sides}`,
        metadata: { prop: 'sides', value: sides },
      });

    const diceDTO = await this.diceDAO.create({
      sides,
      value: null,
      position: null,
      ownerID: null,
    });

    return DiceHydrator.hydrate(diceDTO);
  }
}

export namespace DAOCreateDiceUsecase {
  export type Deps = {
    diceDAO: DiceDAO;
  };
}
