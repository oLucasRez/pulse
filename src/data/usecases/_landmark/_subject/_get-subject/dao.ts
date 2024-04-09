import { SubjectModel } from '@domain/models';
import { GetSubjectUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectObserver } from '@data/observers';

export class DAOGetSubjectUsecase implements GetSubjectUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly fetchSubjectPublisher: FetchSubjectObserver.Publisher;

  public constructor(deps: DAOGetSubjectUsecase.Deps) {
    this.subjectDAO = deps.subjectDAO;
    this.fetchSubjectPublisher = deps.fetchSubjectPublisher;
  }

  public async execute(id: string): Promise<SubjectModel | null> {
    const dto = await this.subjectDAO.getByID(id);

    const subject = dto ? SubjectHydrator.hydrate(dto) : null;

    this.fetchSubjectPublisher.notifyFetchSubject(id, subject);

    return subject;
  }
}

export namespace DAOGetSubjectUsecase {
  export type Deps = {
    subjectDAO: ISubjectDAO;
    fetchSubjectPublisher: FetchSubjectObserver.Publisher;
  };
}
