import { SubjectPulseModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchSubjectPulseObserver {
  export interface Subscriber {
    onFetchSubjectPulse(
      id: string,
      subjectPulse: SubjectPulseModel | null,
    ): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchSubjectPulse(
      id: string,
      subjectPulse: SubjectPulseModel | null,
    ): void;
  }
}
