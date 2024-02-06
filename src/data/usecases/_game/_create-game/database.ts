import { GameModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { CreateGameUsecase, GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateGameUsecase implements CreateGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCreateGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(payload: CreateGameUsecase.Payload): Promise<GameModel> {
    const { title = null } = payload;

    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'create game' } });

    try {
      const table = await this.tableGenerator.getTable();

      const game = await this.database.insert<GameModel>(table, {
        hostID: me.id,
        title,
        config: {
          maxPlayers: 5,
        },
      });

      return game;
    } catch {
      throw new FailedError({ metadata: { tried: 'create game' } });
    }
  }
}

export namespace DatabaseCreateGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
