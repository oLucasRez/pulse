import { SubjectPulseModel } from '@domain/models';
import { IGetSubjectPulseUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { FetchSubjectPulseObserver } from '@data/observers';

export class GetSubjectPulseUsecase implements IGetSubjectPulseUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly fetchSubjectPulsePublisher: FetchSubjectPulseObserver.Publisher;

  public constructor({ subjectPulseDAO, fetchSubjectPulsePublisher }: Deps) {
    this.subjectPulseDAO = subjectPulseDAO;
    this.fetchSubjectPulsePublisher = fetchSubjectPulsePublisher;
  }

  public async execute(id: string): Promise<SubjectPulseModel | null> {
    const dto = await this.subjectPulseDAO.getByID(id);

    const subjectPulse = dto ? SubjectPulseHydrator.hydrate(dto) : null;

    this.fetchSubjectPulsePublisher.notifyFetchSubjectPulse(id, subjectPulse);

    return subjectPulse;
  }
}

type Deps = {
  subjectPulseDAO: ISubjectPulseDAO;
  fetchSubjectPulsePublisher: FetchSubjectPulseObserver.Publisher;
};
