import { DiceModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetDiceUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseGetDiceUsecase implements GetDiceUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetDiceUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<DiceModel> {
    try {
      const [dice] = await this.database.select<DiceModel>(
        this.table,
        (dice) => dice.id === id,
      );

      if (!dice) throw 'error';

      return dice;
    } catch {
      throw new NotFoundError({
        metadata: { entity: 'Dice', prop: 'id', value: id },
      });
    }
  }
}

export namespace DatabaseGetDiceUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
  };
}
