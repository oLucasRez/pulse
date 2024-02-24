import { DiceModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { DiceHydrator } from '@domain/hydration';

import { CreateDiceUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateDiceUsecase implements CreateDiceUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseCreateDiceUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(payload: CreateDiceUsecase.Payload): Promise<DiceModel> {
    const { sides } = payload;

    if (![4, 6, 8, 10, 12].includes(sides))
      throw new ForbiddenError({
        message: `Dice must have 4, 6, 8, 10 or 12 sides; got ${sides}`,
        metadata: { prop: 'sides', value: sides },
      });

    try {
      const table = await this.tableGenerator.getTable();

      const dice = await this.database.insert<DiceModel.JSON>(table, {
        sides,
        value: null,
        position: null,
        ownerID: null,
      });

      return DiceHydrator.hydrate(dice);
    } catch {
      throw new FailedError({ metadata: { tried: 'create dice' } });
    }
  }
}

export namespace DatabaseCreateDiceUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
