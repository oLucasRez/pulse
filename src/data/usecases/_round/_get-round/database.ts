import { RoundHydrator } from '@data/hydration/_round';

import { RoundModel } from '@domain/models';

import { GetRoundUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetRoundUsecase implements GetRoundUsecase {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGetRoundUsecase.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(id: string): Promise<RoundModel | null> {
    const table = await this.tableGenerator.getTable();

    const [round] = await this.database.select<RoundModel.JSON>(
      table,
      (round) => round.id === id,
    );

    return round ? RoundHydrator.hydrate(round) : null;
  }
}

export namespace DatabaseGetRoundUsecase {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
