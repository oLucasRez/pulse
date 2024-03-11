import { SubjectModel } from '@domain/models';
import { GetSubjectsUsecase } from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectsObserver } from '@data/observers';

export class DAOGetSubjectsUsecase implements GetSubjectsUsecase {
  private readonly subjectDAO: SubjectDAO;
  private readonly fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;

  public constructor(deps: DAOGetSubjectsUsecase.Deps) {
    this.subjectDAO = deps.subjectDAO;
    this.fetchSubjectsPublisher = deps.fetchSubjectsPublisher;
  }

  public async execute(): Promise<SubjectModel[]> {
    const dto = await this.subjectDAO.read();

    const subjects = dto.map(SubjectHydrator.hydrate);

    this.fetchSubjectsPublisher.notifyFetchSubjects(subjects);

    return subjects;
  }
}

export namespace DAOGetSubjectsUsecase {
  export type Deps = {
    subjectDAO: SubjectDAO;
    fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;
  };
}
