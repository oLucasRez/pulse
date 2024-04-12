import { AnswerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchAnswerObserver {
  export interface Subscriber {
    onFetchAnswer(id: string, answer: AnswerModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchAnswer(id: string, answer: AnswerModel | null): void;
  }
}
