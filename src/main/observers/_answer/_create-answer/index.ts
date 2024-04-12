import { AnswerModel } from '@domain/models';

import { CreateAnswerObserver, Publisher } from '@data/observers';

export class CreateAnswerPublisher
  extends Publisher<CreateAnswerObserver.Subscriber>
  implements CreateAnswerObserver.Publisher
{
  public notifyCreateAnswer(answer: AnswerModel): void {
    this.subscribers.map((subscriber) => subscriber.onCreateAnswer(answer));
  }
}
