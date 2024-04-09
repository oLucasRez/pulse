import { SubjectPulseModel } from '@domain/models';
import { GetSubjectPulsesUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { FetchSubjectPulsesObserver } from '@data/observers';

export class DAOGetSubjectPulsesUsecase implements GetSubjectPulsesUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;

  public constructor(deps: DAOGetSubjectPulsesUsecase.Deps) {
    this.subjectPulseDAO = deps.subjectPulseDAO;
    this.fetchSubjectPulsesPublisher = deps.fetchSubjectPulsesPublisher;
  }

  public async execute(): Promise<SubjectPulseModel[]> {
    const dto = await this.subjectPulseDAO.getAll();

    const subjectPulses = dto.map(SubjectPulseHydrator.hydrate);

    this.fetchSubjectPulsesPublisher.notifyFetchSubjectPulses(subjectPulses);

    return subjectPulses;
  }
}

export namespace DAOGetSubjectPulsesUsecase {
  export type Deps = {
    subjectPulseDAO: ISubjectPulseDAO;
    fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;
  };
}
