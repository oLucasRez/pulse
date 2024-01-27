import { DiceModel } from '@domain/models';

import { FailedError, NotIntegerError, OutOfBoundError } from '@domain/errors';

import {
  ChangeDiceUsecase,
  GetDiceUsecase,
  GetPlayerUsecase,
} from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

import { isInteger, isNonNullable } from '@domain/utils';

export class DatabaseChangeDiceUsecase implements ChangeDiceUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;
  private readonly getDice: GetDiceUsecase;
  private readonly getPlayer: GetPlayerUsecase;

  public constructor(deps: DatabaseChangeDiceUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
    this.getDice = deps.getDice;
    this.getPlayer = deps.getPlayer;
  }

  public async execute(
    id: string,
    payload: ChangeDiceUsecase.Payload,
  ): Promise<DiceModel> {
    const { value, position, ownerID } = payload;

    if (isNonNullable(value)) {
      const dice = await this.getDice.execute(id);

      this.valueShouldBeAbove1(value);
      this.valueShouldBeBelowSides(value, dice);
      this.valueShouldBeInteger(value);
    }

    if (isNonNullable(ownerID)) {
      await this.ownerShouldExists(ownerID);
    }

    try {
      const updatedDice = await this.database.update<DiceModel>(this.table, {
        id,

        value,
        position,
        ownerID,
      });

      return updatedDice;
    } catch {
      throw new FailedError(`Failed to change data of dice ${id}`);
    }
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

  private async ownerShouldExists(ownerID: string): Promise<void> {
    this.getPlayer.execute(ownerID);
  }
}

export namespace DatabaseChangeDiceUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
    getDice: GetDiceUsecase;
    getPlayer: GetPlayerUsecase;
  };
}
