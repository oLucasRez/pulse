import { WatchSubjectPulsesUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { SubjectPulseHydrator } from '@data/hydration';
import { FetchSubjectPulsesObserver } from '@data/observers';

export class DAOWatchSubjectPulsesUsecase implements WatchSubjectPulsesUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
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
    subjectPulseDAO: ISubjectPulseDAO;
    fetchSubjectPulsesPublisher: FetchSubjectPulsesObserver.Publisher;
  };
}
