import { RoundDAO } from '@data/dao';
import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseRoundDAO implements RoundDAO {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseRoundDAO.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(payload: RoundDAO.CreatePayload): Promise<RoundDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const round = await this.database.insert<RoundDAO.DTO>(table, payload);

    return round;
  }

  public async read(): Promise<RoundDAO.DTO[]>;
  public async read(id: string): Promise<RoundDAO.DTO | null>;
  public async read(
    id?: string,
  ): Promise<RoundDAO.DTO | RoundDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [round] = await Asyncleton.run(`databaseRoundDAO:read:${id}`, () =>
        this.database.select<RoundDAO.DTO>(table, (round) => round.id === id),
      );

      return round || null;
    }

    const rounds = await Asyncleton.run('databaseRoundDAO:read', () =>
      this.database.select<RoundDAO.DTO>(table),
    );

    return rounds;
  }

  public async update(
    id: string,
    payload: RoundDAO.UpdatePayload,
  ): Promise<RoundDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const round = await this.database.update<RoundDAO.DTO>(table, id, payload);

    return round;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabaseRoundDAO {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
