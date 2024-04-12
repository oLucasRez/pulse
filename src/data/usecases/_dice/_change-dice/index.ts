import {
  ForbiddenError,
  NotFoundError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  IChangeDiceUsecase,
  IGetDiceUsecase,
  IGetPlayerUsecase,
} from '@domain/usecases';
import { isInteger, isNonNullable } from '@domain/utils';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { ChangeDiceObserver } from '@data/observers';

export class ChangeDiceUsecase implements IChangeDiceUsecase {
  private readonly getDice: IGetDiceUsecase;
  private readonly getPlayer: IGetPlayerUsecase;
  private readonly diceDAO: IDiceDAO;
  private readonly changeDicePublisher: ChangeDiceObserver.Publisher;

  public constructor({
    getDice,
    getPlayer,
    diceDAO,
    changeDicePublisher,
  }: Deps) {
    this.getDice = getDice;
    this.getPlayer = getPlayer;
    this.diceDAO = diceDAO;
    this.changeDicePublisher = changeDicePublisher;
  }

  public async execute(
    id: string,
    payload: IChangeDiceUsecase.Payload,
  ): Promise<DiceModel> {
    const { value, ownerID } = payload;

    let dice = await this.getDice.execute(id);
    if (!dice)
      throw new NotFoundError({
        metadata: { entity: 'Dice', prop: 'id', value: id },
      });

    if (isNonNullable(value)) {
      this.valueShouldBeAbove1(value);
      this.valueShouldBeBelowSides(value, dice);
      this.valueShouldBeInteger(value);
    }

    if (isNonNullable(ownerID)) {
      this.ownerShouldBePreviouslyUnset(dice);
      await this.ownerShouldExists(ownerID);
    }

    const dto = await this.diceDAO.update(id, {
      value,
      ownerID,
    });

    dice = DiceHydrator.hydrate(dto);

    this.changeDicePublisher.notifyChangeDice(dice);

    return dice;
  }

  private valueShouldBeAbove1(value: number): void {
    if (value < 1)
      throw new OutOfBoundError({
        metadata: { prop: 'value', value, bound: 'below', limit: 1 },
      });
  }

  private valueShouldBeBelowSides(value: number, dice: DiceModel): void {
    if (value > dice.sides)
      throw new OutOfBoundError({
        metadata: { prop: 'value', value, bound: 'above', limit: dice.sides },
      });
  }

  private valueShouldBeInteger(value: number): void {
    if (!isInteger(value))
      throw new NotIntegerError({ metadata: { prop: 'value', value } });
  }

  private ownerShouldBePreviouslyUnset(dice: DiceModel): void {
    if (dice.ownerID)
      throw new ForbiddenError({ metadata: { tried: 'change dice owner' } });
  }

  private async ownerShouldExists(ownerID: string): Promise<void> {
    await this.getPlayer.execute(ownerID);
  }
}

type Deps = {
  getDice: IGetDiceUsecase;
  getPlayer: IGetPlayerUsecase;
  diceDAO: IDiceDAO;
  changeDicePublisher: ChangeDiceObserver.Publisher;
};
