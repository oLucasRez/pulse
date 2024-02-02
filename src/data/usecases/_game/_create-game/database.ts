import { GameModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import {
  CreateCentralPulseUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateGameUsecase implements CreateGameUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;
  private readonly createCentralPulse: CreateCentralPulseUsecase;
  private readonly deleteGame: DeleteGameUsecase;

  public constructor(deps: DatabaseCreateGameUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
    this.createCentralPulse = deps.createCentralPulse;
    this.deleteGame = deps.deleteGame;
  }

  public async execute(payload: CreateGameUsecase.Payload): Promise<GameModel> {
    const { hostID } = payload;

    try {
      const table = await this.tableGenerator.getTable();

      const game = await this.database.insert<GameModel>(table, {
        hostID,
      });

      try {
        await this.createCentralPulse.execute();
      } catch (e) {
        if (e instanceof FailedError) await this.deleteGame.execute(game.id);

        throw e;
      }

      return game;
    } catch {
      throw new FailedError({ metadata: { tried: 'create game' } });
    }
  }
}

export namespace DatabaseCreateGameUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
    createCentralPulse: CreateCentralPulseUsecase;
    deleteGame: DeleteGameUsecase;
  };
}
