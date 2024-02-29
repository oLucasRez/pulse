import { SubjectModel } from '@domain/models';

import { SubjectHydrator } from '@data/hydration';

import { GetSubjectsUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetSubjectsUsecase implements GetSubjectsUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetSubjectsUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<SubjectModel[]> {
    const table = await this.tableGenerator.getTable();

    const subjects = await this.database.select<SubjectModel.JSON>(table);

    return Promise.all(subjects.map(SubjectHydrator.hydrate));
  }
}

export namespace DatabaseGetSubjectsUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
