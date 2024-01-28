import { DiceModel } from '@domain/models';

import {
  FailedError,
  ForbiddenError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';

import {
  ChangeDiceUsecase,
  GetDiceUsecase,
  GetPlayerUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { isInteger, isNonNullable } from '@domain/utils';

export class DatabaseChangeDiceUsecase implements ChangeDiceUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;
  private readonly getDice: GetDiceUsecase;
  private readonly getPlayer: GetPlayerUsecase;

  public constructor(deps: DatabaseChangeDiceUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
    this.getDice = deps.getDice;
    this.getPlayer = deps.getPlayer;
  }

  public async execute(
    id: string,
    payload: ChangeDiceUsecase.Payload,
  ): Promise<DiceModel> {
    const { value, position, ownerID } = payload;

    const dice = await this.getDice.execute(id);

    if (isNonNullable(value)) {
      this.valueShouldBeAbove1(value);
      this.valueShouldBeBelowSides(value, dice);
      this.valueShouldBeInteger(value);
    }

    if (isNonNullable(ownerID)) {
      this.ownerIDShouldBePreviouslyUnset(dice);
      await this.ownerShouldExists(ownerID);
    }

    try {
      const table = await this.tableGenerator.getTable();

      const updatedDice = await this.database.update<DiceModel>(table, {
        id,

        value,
        position,
        ownerID,
      });

      return updatedDice;
    } catch {
      throw new FailedError({ metadata: { tried: 'change data of dice' } });
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

  private ownerIDShouldBePreviouslyUnset(dice: DiceModel): void {
    if (dice.ownerID)
      throw new ForbiddenError({ metadata: { tried: 'change dice owner' } });
  }

  private async ownerShouldExists(ownerID: string): Promise<void> {
    await this.getPlayer.execute(ownerID);
  }
}

export namespace DatabaseChangeDiceUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
    getDice: GetDiceUsecase;
    getPlayer: GetPlayerUsecase;
  };
}
