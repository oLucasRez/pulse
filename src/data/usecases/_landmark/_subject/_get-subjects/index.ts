import { SubjectModel } from '@domain/models';
import { IGetSubjectsUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectsObserver } from '@data/observers';

export class GetSubjectsUsecase implements IGetSubjectsUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;

  public constructor({ subjectDAO, fetchSubjectsPublisher }: Deps) {
    this.subjectDAO = subjectDAO;
    this.fetchSubjectsPublisher = fetchSubjectsPublisher;
  }

  public async execute(): Promise<SubjectModel[]> {
    const dto = await this.subjectDAO.getAll();

    const subjects = dto.map(SubjectHydrator.hydrate);

    this.fetchSubjectsPublisher.notifyFetchSubjects(subjects);

    return subjects;
  }
}

type Deps = {
  subjectDAO: ISubjectDAO;
  fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;
};
