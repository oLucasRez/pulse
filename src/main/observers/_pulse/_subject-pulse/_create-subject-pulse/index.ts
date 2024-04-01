import { SubjectPulseModel } from '@domain/models';

import { CreateSubjectPulseObserver, Publisher } from '@data/observers';

export class CreateSubjectPulsePublisher
  extends Publisher<CreateSubjectPulseObserver.Subscriber>
  implements CreateSubjectPulseObserver.Publisher
{
  public notifyCreateSubjectPulse(subjectPulse: SubjectPulseModel): void {
    this.subscribers.map((subscriber) =>
      subscriber.onCreateSubjectPulse(subjectPulse),
    );
  }
}
