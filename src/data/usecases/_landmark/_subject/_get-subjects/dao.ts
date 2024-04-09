import { SubjectModel } from '@domain/models';
import { GetSubjectsUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectsObserver } from '@data/observers';

export class DAOGetSubjectsUsecase implements GetSubjectsUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;

  public constructor(deps: DAOGetSubjectsUsecase.Deps) {
    this.subjectDAO = deps.subjectDAO;
    this.fetchSubjectsPublisher = deps.fetchSubjectsPublisher;
  }

  public async execute(): Promise<SubjectModel[]> {
    const dto = await this.subjectDAO.getAll();

    const subjects = dto.map(SubjectHydrator.hydrate);

    this.fetchSubjectsPublisher.notifyFetchSubjects(subjects);

    return subjects;
  }
}

export namespace DAOGetSubjectsUsecase {
  export type Deps = {
    subjectDAO: ISubjectDAO;
    fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;
  };
}
