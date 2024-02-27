import { SubjectModel } from '@domain/models';

import { FailedError, ForbiddenError, NotFoundError } from '@domain/errors';

import { SubjectHydrator } from '@data/hydration';

import {
  ChangeSubjectUsecase,
  GetMyPlayerUsecase,
  GetSubjectUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangeSubjectUsecase implements ChangeSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly getSubject: GetSubjectUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseChangeSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.getSubject = deps.getSubject;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    id: string,
    payload: ChangeSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const subject = await this.getSubject.execute(id);

    if (!subject)
      throw new NotFoundError({
        metadata: { entity: 'Subject', prop: 'id', value: id },
      });

    if (subject.author.id !== myPlayer.id)
      throw new ForbiddenError({
        metadata: { tried: 'change subject that is not mine' },
      });

    try {
      const table = await this.tableGenerator.getTable();

      const json = await this.database.update<SubjectModel.JSON>(table, id, {
        position: position.toJSON(),
        description,
      });

      return SubjectHydrator.hydrate(json);
    } catch {
      throw new FailedError({
        metadata: { tried: 'change data of subject' },
      });
    }
  }
}

export namespace DatabaseChangeSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    getSubject: GetSubjectUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
