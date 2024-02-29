import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { RoundCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabaseRoundCRUD implements RoundCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseRoundCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: RoundCRUD.CreatePayload,
  ): Promise<RoundCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const round = await this.database.insert<RoundCRUD.DTO>(table, payload);

    return round;
  }

  public async read(): Promise<RoundCRUD.DTO[]>;
  public async read(id: string): Promise<RoundCRUD.DTO | null>;
  public async read(
    id?: string,
  ): Promise<RoundCRUD.DTO | RoundCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [round] = await Asyncleton.run(`databaseRoundCRUD:read:${id}`, () =>
        this.database.select<RoundCRUD.DTO>(table, (round) => round.id === id),
      );

      return round || null;
    }

    const rounds = await Asyncleton.run('databaseRoundCRUD:read', () =>
      this.database.select<RoundCRUD.DTO>(table),
    );

    return rounds;
  }

  public async update(
    id: string,
    payload: RoundCRUD.UpdatePayload,
  ): Promise<RoundCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const round = await this.database.update<RoundCRUD.DTO>(table, id, payload);

    return round;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabaseRoundCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
