import { QuestionModel } from '@domain/models';

import { CreateQuestionObserver } from '@data/observers';

import { store } from '@main/store';

import { createQuestionAction } from '../../actions';

export class QuestionStoreCreateQuestionSubscriber
  implements CreateQuestionObserver.Subscriber
{
  public onCreateQuestion(question: QuestionModel): void {
    store.dispatch(createQuestionAction(question));
  }
}
