import { SubjectModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeSubjectObserver {
  export interface Subscriber {
    onChangeSubject(subject: SubjectModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeSubject(subject: SubjectModel): void;
  }
}
