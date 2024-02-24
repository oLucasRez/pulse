import { GameModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import {
  CreateCentralPulseUsecase,
  CreateDiceUsecase,
  GetCurrentGameUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseStartGameUsecase implements StartGameUsecase {
  private readonly createCentralPulse: CreateCentralPulseUsecase;
  private readonly createDice: CreateDiceUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseStartGameUsecase.Deps) {
    this.createCentralPulse = deps.createCentralPulse;
    this.createDice = deps.createDice;
    this.getCurrentGame = deps.getCurrentGame;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<GameModel> {
    let game = await this.getCurrentGame.execute();
    if (!game) throw new ForbiddenError({ metadata: { tried: 'start game' } });

    await this.createCentralPulse.execute();

    await Promise.all([
      this.createDice.execute({ sides: 4 }),
      this.createDice.execute({ sides: 6 }),
      this.createDice.execute({ sides: 8 }),
      this.createDice.execute({ sides: 10 }),
      this.createDice.execute({ sides: 12 }),
    ]);

    const table = await this.tableGenerator.getTable();

    game = await this.database.update<GameModel>(table, game.id, {
      started: true,
    });

    return game;
  }
}

export namespace DatabaseStartGameUsecase {
  export type Deps = {
    createCentralPulse: CreateCentralPulseUsecase;
    createDice: CreateDiceUsecase;
    getCurrentGame: GetCurrentGameUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
