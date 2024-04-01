import { SubjectPulseDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SocketProtocol,
  TableGenerator,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseSubjectPulseDAO implements SubjectPulseDAO {
  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseSubjectPulseDAO.Deps) {
    this.database = deps.database;
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: SubjectPulseDAO.CreatePayload,
  ): Promise<SubjectPulseDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const subjectPulse = await this.database.insert<SubjectPulseDAO.DTO>(
      table,
      payload,
    );

    return subjectPulse;
  }

  public async read(): Promise<SubjectPulseDAO.DTO[]>;
  public async read(id: string): Promise<SubjectPulseDAO.DTO | null>;
  public async read(
    id?: string,
  ): Promise<SubjectPulseDAO.DTO | SubjectPulseDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [subjectPulse] = await Asyncleton.run(
        `databaseSubjectPulseDAO:read:${id}`,
        () =>
          this.database.select<SubjectPulseDAO.DTO>(
            table,
            (subjectPulse) => subjectPulse.id === id,
          ),
      );

      return subjectPulse || null;
    }

    const subjectPulses = await Asyncleton.run(
      'databaseSubjectPulseDAO:read',
      () => this.database.select<SubjectPulseDAO.DTO>(table),
    );

    return subjectPulses;
  }

  public async update(
    id: string,
    payload: SubjectPulseDAO.UpdatePayload,
  ): Promise<SubjectPulseDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const subjectPulse = await this.database.update<SubjectPulseDAO.DTO>(
      table,
      id,
      payload,
    );

    return subjectPulse;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }

  public async watch(
    callback: (dtos: SubjectPulseDAO.DTO[]) => void,
  ): Promise<() => void> {
    const table = await this.tableGenerator.getTable();

    return this.socket.watch<SubjectPulseDAO.DTO>(table, callback);
  }
}

export namespace DatabaseSubjectPulseDAO {
  export type Deps = {
    database: DatabaseProtocol;
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
  };
}
