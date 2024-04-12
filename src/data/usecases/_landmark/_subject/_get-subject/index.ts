import { SubjectModel } from '@domain/models';
import { IGetSubjectUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectObserver } from '@data/observers';

export class GetSubjectUsecase implements IGetSubjectUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly fetchSubjectPublisher: FetchSubjectObserver.Publisher;

  public constructor({ subjectDAO, fetchSubjectPublisher }: Deps) {
    this.subjectDAO = subjectDAO;
    this.fetchSubjectPublisher = fetchSubjectPublisher;
  }

  public async execute(id: string): Promise<SubjectModel | null> {
    const dto = await this.subjectDAO.getByID(id);

    const subject = dto ? SubjectHydrator.hydrate(dto) : null;

    this.fetchSubjectPublisher.notifyFetchSubject(id, subject);

    return subject;
  }
}

type Deps = {
  subjectDAO: ISubjectDAO;
  fetchSubjectPublisher: FetchSubjectObserver.Publisher;
};
