import { DiceModel } from '@domain/models';

import {
  ForbiddenError,
  NotFoundError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';

import { DiceHydrator } from '@data/hydration';

import {
  ChangeDiceUsecase,
  GetDiceUsecase,
  GetPlayerUsecase,
} from '@domain/usecases';

import { DiceCRUD } from '@data/cruds';

import { isInteger, isNonNullable } from '@domain/utils';

export class CRUDChangeDiceUsecase implements ChangeDiceUsecase {
  private readonly getDice: GetDiceUsecase;
  private readonly getPlayer: GetPlayerUsecase;
  private readonly diceCRUD: DiceCRUD;

  public constructor(deps: CRUDChangeDiceUsecase.Deps) {
    this.getDice = deps.getDice;
    this.getPlayer = deps.getPlayer;
    this.diceCRUD = deps.diceCRUD;
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

    const diceDTO = await this.diceCRUD.update(id, {
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
    if (dice.owner)
      throw new ForbiddenError({ metadata: { tried: 'change dice owner' } });
  }

  private async ownerShouldExists(ownerID: string): Promise<void> {
    await this.getPlayer.execute(ownerID);
  }
}

export namespace CRUDChangeDiceUsecase {
  export type Deps = {
    getDice: GetDiceUsecase;
    getPlayer: GetPlayerUsecase;
    diceCRUD: DiceCRUD;
  };
}
