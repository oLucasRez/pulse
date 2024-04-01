import { SubjectPulseModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchSubjectPulsesObserver {
  export interface Subscriber {
    onFetchSubjectPulses(subjectPulses: SubjectPulseModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchSubjectPulses(subjectPulses: SubjectPulseModel[]): void;
  }
}
