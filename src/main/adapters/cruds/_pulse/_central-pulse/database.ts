import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { CentralPulseCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabaseCentralPulseCRUD implements CentralPulseCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCentralPulseCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: CentralPulseCRUD.CreatePayload,
  ): Promise<CentralPulseCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralPulse = await this.database.insert<CentralPulseCRUD.DTO>(
      table,
      payload,
    );

    return centralPulse;
  }

  public async read(): Promise<CentralPulseCRUD.DTO[]>;
  public async read(id: string): Promise<CentralPulseCRUD.DTO | null>;
  public async read(
    id?: string,
  ): Promise<CentralPulseCRUD.DTO | CentralPulseCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [centralPulse] = await Asyncleton.run(
        `databaseCentralPulseCRUD:read:${id}`,
        () =>
          this.database.select<CentralPulseCRUD.DTO>(
            table,
            (centralPulse) => centralPulse.id === id,
          ),
      );

      return centralPulse || null;
    }

    const centralPulses = await Asyncleton.run(
      'databaseCentralPulseCRUD:read',
      () => this.database.select<CentralPulseCRUD.DTO>(table),
    );

    return centralPulses;
  }

  public async update(
    id: string,
    payload: CentralPulseCRUD.UpdatePayload,
  ): Promise<CentralPulseCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralPulse = await this.database.update<CentralPulseCRUD.DTO>(
      table,
      id,
      payload,
    );

    return centralPulse;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }
}

export namespace DatabaseCentralPulseCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
