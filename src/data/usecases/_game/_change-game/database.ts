import { GameModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { GameHydrator } from '@domain/hydration';

import { ChangeGameUsecase, GetCurrentGameUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangeGameUsecase implements ChangeGameUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseChangeGameUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(payload: ChangeGameUsecase.Payload): Promise<GameModel> {
    const { title, config } = payload;

    const game = await this.getCurrentGame.execute();
    if (!game) throw new ForbiddenError({ metadata: { tried: 'change game' } });

    const table = await this.tableGenerator.getTable();

    const json = await this.database.update<GameModel.JSON>(table, game.id, {
      title,
      config,
    });

    return GameHydrator.hydrate(json);
  }
}

export namespace DatabaseChangeGameUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
