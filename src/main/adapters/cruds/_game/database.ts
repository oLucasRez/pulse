import { GameDAO } from '@data/dao';
import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseGameDAO implements GameDAO {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGameDAO.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(payload: GameDAO.CreatePayload): Promise<GameDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const game = await this.database.insert<GameDAO.DTO>(table, payload);

    return game;
  }

  public async read(): Promise<GameDAO.DTO[]>;
  public async read(id: string): Promise<GameDAO.DTO | null>;
  public async read(id?: string): Promise<GameDAO.DTO | GameDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [game] = await Asyncleton.run(`databaseGameDAO:read:${id}`, () =>
        this.database.select<GameDAO.DTO>(table, (game) => game.id === id),
      );

      return game || null;
    }

    const games = await Asyncleton.run('databaseGameDAO:read', () =>
      this.database.select<GameDAO.DTO>(table),
    );

    return games;
  }

  public async update(
    id: string,
    payload: GameDAO.UpdatePayload,
  ): Promise<GameDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const game = await this.database.update<GameDAO.DTO>(table, id, payload);

    return game;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabaseGameDAO {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
