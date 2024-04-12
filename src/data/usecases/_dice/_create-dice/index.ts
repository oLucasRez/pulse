import { ForbiddenError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import { ICreateDiceUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { CreateDiceObserver } from '@data/observers';

export class CreateDiceUsecase implements ICreateDiceUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly createDicePublisher: CreateDiceObserver.Publisher;

  public constructor({ diceDAO, createDicePublisher }: Deps) {
    this.diceDAO = diceDAO;
    this.createDicePublisher = createDicePublisher;
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

    const dice = DiceHydrator.hydrate(dto);

    this.createDicePublisher.notifyCreateDice(dice);

    return dice;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  createDicePublisher: CreateDiceObserver.Publisher;
};
