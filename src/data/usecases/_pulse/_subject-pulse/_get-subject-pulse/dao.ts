import { SubjectPulseModel } from '@domain/models';
import { GetSubjectPulseUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { FetchSubjectPulseObserver } from '@data/observers';

export class DAOGetSubjectPulseUsecase implements GetSubjectPulseUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly fetchSubjectPulsePublisher: FetchSubjectPulseObserver.Publisher;

  public constructor(deps: DAOGetSubjectPulseUsecase.Deps) {
    this.subjectPulseDAO = deps.subjectPulseDAO;
    this.fetchSubjectPulsePublisher = deps.fetchSubjectPulsePublisher;
  }

  public async execute(id: string): Promise<SubjectPulseModel | null> {
    const dto = await this.subjectPulseDAO.getByID(id);

    const subjectPulse = dto ? SubjectPulseHydrator.hydrate(dto) : null;

    this.fetchSubjectPulsePublisher.notifyFetchSubjectPulse(id, subjectPulse);

    return subjectPulse;
  }
}

export namespace DAOGetSubjectPulseUsecase {
  export type Deps = {
    subjectPulseDAO: ISubjectPulseDAO;
    fetchSubjectPulsePublisher: FetchSubjectPulseObserver.Publisher;
  };
}
