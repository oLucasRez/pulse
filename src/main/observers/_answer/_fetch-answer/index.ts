import { AnswerModel } from '@domain/models';

import { FetchAnswerObserver, Publisher } from '@data/observers';

export class FetchAnswerPublisher
  extends Publisher<FetchAnswerObserver.Subscriber>
  implements FetchAnswerObserver.Publisher
{
  public notifyFetchAnswer(id: string, answer: AnswerModel | null): void {
    this.subscribers.map((subscriber) => subscriber.onFetchAnswer(id, answer));
  }
}
