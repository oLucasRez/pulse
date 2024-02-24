import { GameModel } from '@domain/models';

import {
  FailedError,
  ForbiddenError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';

import { CreateGameUsecase, GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { isInteger } from '@domain/utils';

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
    const { title = null, config } = payload;

    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'create game' } });

    this.maxPlayersShouldBeValid(config.maxPlayers);

    try {
      const table = await this.tableGenerator.getTable();

      const game = await this.database.insert<GameModel>(table, {
        uid: me.uid,
        title,
        config,
        started: false,
      });

      return game;
    } catch {
      throw new FailedError({ metadata: { tried: 'create game' } });
    }
  }

  private maxPlayersShouldBeValid(maxPlayers: number): void {
    const prop = 'config.maxPlayers';
    const value = maxPlayers;

    if (maxPlayers < 3)
      throw new OutOfBoundError({
        metadata: { prop, value, bound: 'below', limit: 3 },
      });

    if (maxPlayers > 5)
      throw new OutOfBoundError({
        metadata: { prop, value, bound: 'above', limit: 5 },
      });

    if (!isInteger(maxPlayers))
      throw new NotIntegerError({ metadata: { prop, value } });
  }
}

export namespace DatabaseCreateGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
