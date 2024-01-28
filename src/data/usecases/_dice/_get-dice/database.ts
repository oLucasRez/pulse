import { DiceModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetDiceUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetDiceUsecase implements GetDiceUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetDiceUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<DiceModel> {
    try {
      const table = await this.tableGenerator.getTable();

      const [dice] = await this.database.select<DiceModel>(
        table,
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
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
