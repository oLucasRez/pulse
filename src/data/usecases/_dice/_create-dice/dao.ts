import { ForbiddenError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import { CreateDiceUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { CreateDiceObserver } from '@data/observers';

export class DAOCreateDiceUsecase implements CreateDiceUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly createDicePublisher: CreateDiceObserver.Publisher;

  public constructor(deps: DAOCreateDiceUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
    this.createDicePublisher = deps.createDicePublisher;
  }

  public async execute(payload: CreateDiceUsecase.Payload): Promise<DiceModel> {
    const { sides, ownerID } = payload;

    if (![4, 6, 8, 10, 12].includes(sides))
      throw new ForbiddenError({
        message: `Dice must have 4, 6, 8, 10 or 12 sides; got ${sides}`,
        metadata: { prop: 'sides', value: sides },
      });

    const dto = await this.diceDAO.create({
      sides,
      value: null,
      position: null,
      ownerID,
    });

    const dice = DiceHydrator.hydrate(dto);

    this.createDicePublisher.notifyCreateDice(dice);

    return dice;
  }
}

export namespace DAOCreateDiceUsecase {
  export type Deps = {
    diceDAO: IDiceDAO;
    createDicePublisher: CreateDiceObserver.Publisher;
  };
}
