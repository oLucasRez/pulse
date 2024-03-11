import { PlayerDAO } from '@data/dao';
import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabasePlayerDAO implements PlayerDAO {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabasePlayerDAO.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: PlayerDAO.CreatePayload,
  ): Promise<PlayerDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const player = await this.database.insert<PlayerDAO.DTO>(table, payload);

    return player;
  }

  public async read(): Promise<PlayerDAO.DTO[]>;
  public async read(id: string): Promise<PlayerDAO.DTO | null>;
  public async read(
    id?: string,
  ): Promise<PlayerDAO.DTO | PlayerDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [player] = await Asyncleton.run(
        `databasePlayerDAO:read:${id}`,
        () =>
          this.database.select<PlayerDAO.DTO>(
            table,
            (player) => player.id === id,
          ),
      );

      return player || null;
    }

    const players = await Asyncleton.run('databasePlayerDAO:read', () =>
      this.database.select<PlayerDAO.DTO>(table),
    );

    return players;
  }

  public async update(
    id: string,
    payload: PlayerDAO.UpdatePayload,
  ): Promise<PlayerDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const player = await this.database.update<PlayerDAO.DTO>(
      table,
      id,
      payload,
    );

    return player;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabasePlayerDAO {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
