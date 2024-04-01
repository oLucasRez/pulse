import { SubjectModel } from '@domain/models';

import { CreateSubjectObserver, Publisher } from '@data/observers';

export class CreateSubjectPublisher
  extends Publisher<CreateSubjectObserver.Subscriber>
  implements CreateSubjectObserver.Publisher
{
  public notifyCreateSubject(subject: SubjectModel): void {
    this.subscribers.map((subscriber) => subscriber.onCreateSubject(subject));
  }
}
