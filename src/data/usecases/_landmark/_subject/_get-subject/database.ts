import { SubjectModel } from '@domain/models';

import { SubjectHydrator } from '@domain/hydration';

import { GetSubjectUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetSubjectUsecase implements GetSubjectUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetSubjectUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<SubjectModel | null> {
    const table = await this.tableGenerator.getTable();

    const [subject] = await this.database.select<SubjectModel.JSON>(
      table,
      (subject) => subject.id === id,
    );

    return subject ? SubjectHydrator.hydrate(subject) : null;
  }
}

export namespace DatabaseGetSubjectUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
