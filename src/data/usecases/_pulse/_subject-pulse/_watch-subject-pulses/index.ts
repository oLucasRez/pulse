import { IWatchSubjectPulsesUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { FetchSubjectPulsesObserver } from '@data/observers';

export class WatchSubjectPulsesUsecase implements IWatchSubjectPulsesUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;

  public constructor({ subjectPulseDAO, fetchSubjectPulsesPublisher }: Deps) {
    this.subjectPulseDAO = subjectPulseDAO;
    this.fetchSubjectPulsesPublisher = fetchSubjectPulsesPublisher;
  }

  public async execute(
    callback: IWatchSubjectPulsesUsecase.Callback,
  ): Promise<IWatchSubjectPulsesUsecase.Response> {
    const unsubscribe = this.subjectPulseDAO.watch((dto) => {
      const subjectPulses = dto.map(SubjectPulseHydrator.hydrate);

      this.fetchSubjectPulsesPublisher.notifyFetchSubjectPulses(subjectPulses);

      callback(subjectPulses);
    });

    return unsubscribe;
  }
}

type Deps = {
  subjectPulseDAO: ISubjectPulseDAO;
  fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;
};
