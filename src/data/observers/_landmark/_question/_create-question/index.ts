import { QuestionModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateQuestionObserver {
  export interface Subscriber {
    onCreateQuestion(question: QuestionModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateQuestion(question: QuestionModel): void;
  }
}
