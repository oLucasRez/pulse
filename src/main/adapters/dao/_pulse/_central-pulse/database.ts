import { CentralPulseDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SocketProtocol,
  TableGenerator,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseCentralPulseDAO implements CentralPulseDAO {
  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCentralPulseDAO.Deps) {
    this.database = deps.database;
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: CentralPulseDAO.CreatePayload,
  ): Promise<CentralPulseDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralPulse = await this.database.insert<CentralPulseDAO.DTO>(
      table,
      payload,
    );

    return centralPulse;
  }

  public async read(): Promise<CentralPulseDAO.DTO[]>;
  public async read(id: string): Promise<CentralPulseDAO.DTO | null>;
  public async read(
    id?: string,
  ): Promise<CentralPulseDAO.DTO | CentralPulseDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [centralPulse] = await Asyncleton.run(
        `databaseCentralPulseDAO:read:${id}`,
        () =>
          this.database.select<CentralPulseDAO.DTO>(
            table,
            (centralPulse) => centralPulse.id === id,
          ),
      );

      return centralPulse || null;
    }

    const centralPulses = await Asyncleton.run(
      'databaseCentralPulseDAO:read',
      () => this.database.select<CentralPulseDAO.DTO>(table),
    );

    return centralPulses;
  }

  public async update(
    id: string,
    payload: CentralPulseDAO.UpdatePayload,
  ): Promise<CentralPulseDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const centralPulse = await this.database.update<CentralPulseDAO.DTO>(
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

  public async watch(
    callback: (dtos: CentralPulseDAO.DTO[]) => void,
  ): Promise<() => void> {
    const table = await this.tableGenerator.getTable();

    return this.socket.watch<CentralPulseDAO.DTO>(table, callback);
  }
}

export namespace DatabaseCentralPulseDAO {
  export type Deps = {
    database: DatabaseProtocol;
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
  };
}
