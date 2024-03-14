import {
  ForbiddenError,
  NotFoundError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  ChangeDiceUsecase,
  GetDiceUsecase,
  GetPlayerUsecase,
} from '@domain/usecases';
import { isInteger, isNonNullable } from '@domain/utils';

import { DiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';

export class DAOChangeDiceUsecase implements ChangeDiceUsecase {
  private readonly getDice: GetDiceUsecase;
  private readonly getPlayer: GetPlayerUsecase;
  private readonly diceDAO: DiceDAO;

  public constructor(deps: DAOChangeDiceUsecase.Deps) {
    this.getDice = deps.getDice;
    this.getPlayer = deps.getPlayer;
    this.diceDAO = deps.diceDAO;
  }

  public async execute(
    id: string,
    payload: ChangeDiceUsecase.Payload,
  ): Promise<DiceModel> {
    const { value, position, ownerID } = payload;

    const dice = await this.getDice.execute(id);
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

    const diceDTO = await this.diceDAO.update(id, {
      value,
      position,
      ownerID,
    });

    return DiceHydrator.hydrate(diceDTO);
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

export namespace DAOChangeDiceUsecase {
  export type Deps = {
    getDice: GetDiceUsecase;
    getPlayer: GetPlayerUsecase;
    diceDAO: DiceDAO;
  };
}
