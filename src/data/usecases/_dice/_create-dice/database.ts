import { DiceModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { CreateDiceUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseCreateDiceUsecase implements CreateDiceUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseCreateDiceUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
  }

  public async execute(payload: CreateDiceUsecase.Payload): Promise<DiceModel> {
    const { sides } = payload;

    if (![4, 6, 8, 10, 12].includes(sides))
      throw new ForbiddenError(
        `Dice must have 4, 6, 8, 10 or 12 sides; got ${sides}`,
        { prop: 'sides', value: sides },
      );

    try {
      const dice = await this.database.insert<DiceModel>(this.table, {
        sides,
        value: null,
        position: null,
        ownerID: null,
      });

      return dice;
    } catch {
      throw new FailedError('Failed to create dice');
    }
  }
}

export namespace DatabaseCreateDiceUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
  };
}
