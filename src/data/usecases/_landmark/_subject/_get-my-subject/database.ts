import { SubjectModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { SubjectHydrator } from '@data/hydration';

import { GetMyPlayerUsecase, GetMySubjectUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetMySubjectUsecase implements GetMySubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGetMySubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<SubjectModel | null> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer?.subject) return null;

    try {
      const table = await this.tableGenerator.getTable();

      const [subject] = await this.database.select<SubjectModel.JSON>(
        table,
        (subject) => subject.id === myPlayer.subject?.id,
      );

      return subject ? SubjectHydrator.hydrate(subject) : null;
    } catch {
      throw new FailedError({ metadata: { tried: 'get my subject' } });
    }
  }
}

export namespace DatabaseGetMySubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
