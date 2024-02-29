import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { PlayerCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabasePlayerCRUD implements PlayerCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabasePlayerCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: PlayerCRUD.CreatePayload,
  ): Promise<PlayerCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const player = await this.database.insert<PlayerCRUD.DTO>(table, payload);

    return player;
  }

  public async read(): Promise<PlayerCRUD.DTO[]>;
  public async read(id: string): Promise<PlayerCRUD.DTO | null>;
  public async read(
    id?: string,
  ): Promise<PlayerCRUD.DTO | PlayerCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [player] = await Asyncleton.run(
        `databasePlayerCRUD:read:${id}`,
        () =>
          this.database.select<PlayerCRUD.DTO>(
            table,
            (player) => player.id === id,
          ),
      );

      return player || null;
    }

    const players = await Asyncleton.run('databasePlayerCRUD:read', () =>
      this.database.select<PlayerCRUD.DTO>(table),
    );

    return players;
  }

  public async update(
    id: string,
    payload: PlayerCRUD.UpdatePayload,
  ): Promise<PlayerCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const player = await this.database.update<PlayerCRUD.DTO>(
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

export namespace DatabasePlayerCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
