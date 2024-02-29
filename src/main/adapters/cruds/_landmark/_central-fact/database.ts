import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { CentralFactCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabaseCentralFactCRUD implements CentralFactCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCentralFactCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: CentralFactCRUD.CreatePayload,
  ): Promise<CentralFactCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralFact = await this.database.insert<CentralFactCRUD.DTO>(
      table,
      payload,
    );

    return centralFact;
  }

  public async read(): Promise<CentralFactCRUD.DTO[]>;
  public async read(id: string): Promise<CentralFactCRUD.DTO | null>;
  public async read(
    id?: string,
  ): Promise<CentralFactCRUD.DTO | CentralFactCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [centralFact] = await Asyncleton.run(
        `databaseCentralFactCRUD:read:${id}`,
        () =>
          this.database.select<CentralFactCRUD.DTO>(
            table,
            (centralFact) => centralFact.id === id,
          ),
      );

      return centralFact || null;
    }

    const centralFacts = await Asyncleton.run(
      'databaseCentralFactCRUD:read',
      () => this.database.select<CentralFactCRUD.DTO>(table),
    );

    return centralFacts;
  }

  public async update(
    id: string,
    payload: CentralFactCRUD.UpdatePayload,
  ): Promise<CentralFactCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralFact = await this.database.update<CentralFactCRUD.DTO>(
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

export namespace DatabaseCentralFactCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
