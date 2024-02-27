import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { GameCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabaseGameCRUD implements GameCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGameCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(payload: GameCRUD.CreatePayload): Promise<GameCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const game = await this.database.insert<GameCRUD.DTO>(table, payload);

    return game;
  }

  public async read(): Promise<GameCRUD.DTO[]>;
  public async read(id: string): Promise<GameCRUD.DTO | null>;
  public async read(
    id?: string,
  ): Promise<GameCRUD.DTO | GameCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [game] = await Asyncleton.run(`databaseGameCRUD:read:${id}`, () =>
        this.database.select<GameCRUD.DTO>(table, (game) => game.id === id),
      );

      return game || null;
    }

    const games = await Asyncleton.run('databaseGameCRUD:read', () =>
      this.database.select<GameCRUD.DTO>(table),
    );

    return games;
  }

  public async update(
    id: string,
    payload: GameCRUD.UpdatePayload,
  ): Promise<GameCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const game = await this.database.update<GameCRUD.DTO>(table, id, payload);

    return game;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabaseGameCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
