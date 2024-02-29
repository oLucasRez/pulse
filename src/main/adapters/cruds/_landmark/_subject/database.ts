import { DatabaseProtocol, TableGenerator } from '@data/protocols';

import { SubjectCRUD } from '@data/cruds';

import { Asyncleton } from '@main/utils';

export class DatabaseSubjectCRUD implements SubjectCRUD {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseSubjectCRUD.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async create(
    payload: SubjectCRUD.CreatePayload,
  ): Promise<SubjectCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const subject = await this.database.insert<SubjectCRUD.DTO>(table, payload);

    return subject;
  }

  public async read(): Promise<SubjectCRUD.DTO[]>;
  public async read(id: string): Promise<SubjectCRUD.DTO | null>;
  public async read(
    id?: string,
  ): Promise<SubjectCRUD.DTO | SubjectCRUD.DTO[] | null> {
    const table = await this.tableGenerator.getTable();

    if (id) {
      const [subject] = await Asyncleton.run(
        `databaseSubjectCRUD:read:${id}`,
        () =>
          this.database.select<SubjectCRUD.DTO>(
            table,
            (subject) => subject.id === id,
          ),
      );

      return subject || null;
    }

    const subjects = await Asyncleton.run('databaseSubjectCRUD:read', () =>
      this.database.select<SubjectCRUD.DTO>(table),
    );

    return subjects;
  }

  public async update(
    id: string,
    payload: SubjectCRUD.UpdatePayload,
  ): Promise<SubjectCRUD.DTO> {
    const table = await this.tableGenerator.getTable();

    const subject = await this.database.update<SubjectCRUD.DTO>(
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
}

export namespace DatabaseSubjectCRUD {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
