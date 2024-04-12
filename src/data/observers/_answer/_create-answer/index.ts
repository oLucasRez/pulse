import { AnswerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateAnswerObserver {
  export interface Subscriber {
    onCreateAnswer(answer: AnswerModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateAnswer(answer: AnswerModel): void;
  }
}
