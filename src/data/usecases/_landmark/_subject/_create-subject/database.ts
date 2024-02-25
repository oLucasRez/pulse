import { SubjectModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { SubjectHydrator } from '@domain/hydration';

import { CreateSubjectUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreateSubjectUsecase implements CreateSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseCreateSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(
    payload: CreateSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description, color } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'create subject' } });

    try {
      const table = await this.tableGenerator.getTable();

      const subject = await this.database.insert<SubjectModel.JSON>(table, {
        position: position ? position.toJSON() : null,
        description,
        color,
        authorID: myPlayer.id,
        pathIDs: [],
      });

      return SubjectHydrator.hydrate(subject);
    } catch (e) {
      throw new FailedError({ metadata: { tried: 'create subject' } });
    }
  }
}

export namespace DatabaseCreateSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
