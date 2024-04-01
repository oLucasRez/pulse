import { WatchSubjectPulsesUsecase } from '@domain/usecases';

import { SubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { FetchSubjectPulsesObserver } from '@data/observers';

export class DAOWatchSubjectPulsesUsecase implements WatchSubjectPulsesUsecase {
  private readonly subjectPulseDAO: SubjectPulseDAO;
  private readonly fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;

  public constructor(deps: DAOWatchSubjectPulsesUsecase.Deps) {
    this.subjectPulseDAO = deps.subjectPulseDAO;
    this.fetchSubjectPulsesPublisher = deps.fetchSubjectPulsesPublisher;
  }

  public async execute(
    callback: WatchSubjectPulsesUsecase.Callback,
  ): Promise<WatchSubjectPulsesUsecase.Response> {
    const unsubscribe = this.subjectPulseDAO.watch((dto) => {
      const subjectPulses = dto.map(SubjectPulseHydrator.hydrate);

      this.fetchSubjectPulsesPublisher.notifyFetchSubjectPulses(subjectPulses);

      callback(subjectPulses);
    });

    return unsubscribe;
  }
}

export namespace DAOWatchSubjectPulsesUsecase {
  export type Deps = {
    subjectPulseDAO: SubjectPulseDAO;
    fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;
  };
}
