import { CentralFactDAO } from '@data/dao';
import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseCentralFactDAO implements CentralFactDAO {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCentralFactDAO.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: CentralFactDAO.CreatePayload,
  ): Promise<CentralFactDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralFact = await this.database.insert<CentralFactDAO.DTO>(
      table,
      payload,
    );

    return centralFact;
  }

  public async read(): Promise<CentralFactDAO.DTO[]>;
  public async read(id: string): Promise<CentralFactDAO.DTO | null>;
  public async read(
    id?: string,
  ): Promise<CentralFactDAO.DTO | CentralFactDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [centralFact] = await Asyncleton.run(
        `databaseCentralFactDAO:read:${id}`,
        () =>
          this.database.select<CentralFactDAO.DTO>(
            table,
            (centralFact) => centralFact.id === id,
          ),
      );

      return centralFact || null;
    }

    const centralFacts = await Asyncleton.run(
      'databaseCentralFactDAO:read',
      () => this.database.select<CentralFactDAO.DTO>(table),
    );

    return centralFacts;
  }

  public async update(
    id: string,
    payload: CentralFactDAO.UpdatePayload,
  ): Promise<CentralFactDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralFact = await this.database.update<CentralFactDAO.DTO>(
      table,
      id,
      payload,
    );

    return centralFact;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabaseCentralFactDAO {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
