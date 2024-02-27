import { RoundHydrator } from '@data/hydration/_round';

import { RoundModel } from '@domain/models';

import { CreateRoundUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateRoundUsecase implements CreateRoundUsecase {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCreateRoundUsecase.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: CreateRoundUsecase.Payload,
  ): Promise<RoundModel> {
    const { playerIDs } = payload;

    const table = await this.tableGenerator.getTable();

    const round = await this.database.insert<RoundModel.JSON>(table, {
      playerIDs,
      currentPlayerID: null,
    });

    return RoundHydrator.hydrate(round);
  }
}

export namespace DatabaseCreateRoundUsecase {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
