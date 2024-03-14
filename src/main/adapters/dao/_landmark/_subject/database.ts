import { SubjectDAO } from '@data/dao';
import {
  DatabaseProtocol,
  SocketProtocol,
  TableGenerator,
} from '@data/protocols';

import { Asyncleton } from '@main/utils';

export class DatabaseSubjectDAO implements SubjectDAO {
  private readonly database: DatabaseProtocol;
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseSubjectDAO.Deps) {
    this.database = deps.database;
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: SubjectDAO.CreatePayload,
  ): Promise<SubjectDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const subject = await this.database.insert<SubjectDAO.DTO>(table, payload);

    return subject;
  }

  public async read(): Promise<SubjectDAO.DTO[]>;
  public async read(id: string): Promise<SubjectDAO.DTO | null>;
  public async read(
    id?: string,
  ): Promise<SubjectDAO.DTO | SubjectDAO.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [subject] = await Asyncleton.run(
        `databaseSubjectDAO:read:${id}`,
        () =>
          this.database.select<SubjectDAO.DTO>(
            table,
            (subject) => subject.id === id,
          ),
      );

      return subject || null;
    }

    const subjects = await Asyncleton.run('databaseSubjectDAO:read', () =>
      this.database.select<SubjectDAO.DTO>(table),
    );

    return subjects;
  }

  public async update(
    id: string,
    payload: SubjectDAO.UpdatePayload,
  ): Promise<SubjectDAO.DTO> {
    const table = await this.tableGenerator.getTable();

    const subject = await this.database.update<SubjectDAO.DTO>(
      table,
      id,
      payload,
    );

    return subject;
  }

  public async delete(id: string): Promise<void> {
    const table = await this.tableGenerator.getTable();

    await this.database.delete(table, id);
  }

  public async watch(
    callback: (dtos: SubjectDAO.DTO[]) => void,
  ): Promise<() => void> {
    const table = await this.tableGenerator.getTable();

    return this.socket.watch<SubjectDAO.DTO>(table, callback);
  }
}

export namespace DatabaseSubjectDAO {
  export type Deps = {
    database: DatabaseProtocol;
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
  };
}
