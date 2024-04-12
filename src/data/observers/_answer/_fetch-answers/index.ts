import { AnswerModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchAnswersObserver {
  export interface Subscriber {
    onFetchAnswers(answers: AnswerModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchAnswers(answers: AnswerModel[]): void;
  }
}
