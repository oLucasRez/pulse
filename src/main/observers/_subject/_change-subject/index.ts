import { SubjectModel } from '@domain/models';

import { ChangeSubjectObserver, Publisher } from '@data/observers';

export class ChangeSubjectPublisher
  extends Publisher<ChangeSubjectObserver.Subscriber>
  implements ChangeSubjectObserver.Publisher
{
  public notifyChangeSubject(subject: SubjectModel): void {
    this.subscribers.map((subscriber) => subscriber.onChangeSubject(subject));
  }
}
