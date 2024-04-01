import { SubjectPulseModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateSubjectPulseObserver {
  export interface Subscriber {
    onCreateSubjectPulse(subjectPulse: SubjectPulseModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateSubjectPulse(subjectPulse: SubjectPulseModel): void;
  }
}
