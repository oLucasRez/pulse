import { SubjectPulseModel } from '@domain/models';
import { IGetSubjectPulsesUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { FetchSubjectPulsesObserver } from '@data/observers';

export class GetSubjectPulsesUsecase implements IGetSubjectPulsesUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;

  public constructor({ subjectPulseDAO, fetchSubjectPulsesPublisher }: Deps) {
    this.subjectPulseDAO = subjectPulseDAO;
    this.fetchSubjectPulsesPublisher = fetchSubjectPulsesPublisher;
  }

  public async execute(): Promise<SubjectPulseModel[]> {
    const dto = await this.subjectPulseDAO.getAll();

    const subjectPulses = dto.map(SubjectPulseHydrator.hydrate);

    this.fetchSubjectPulsesPublisher.notifyFetchSubjectPulses(subjectPulses);

    return subjectPulses;
  }
}

type Deps = {
  subjectPulseDAO: ISubjectPulseDAO;
  fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;
};
