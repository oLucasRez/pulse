import { QuestionModel } from '@domain/models';

import { ChangeQuestionObserver } from '@data/observers';

import { store } from '@main/store';

import { changeQuestionAction } from '../../actions';

export class QuestionStoreChangeQuestionSubscriber
  implements ChangeQuestionObserver.Subscriber
{
  public onChangeQuestion(question: QuestionModel): void {
    store.dispatch(changeQuestionAction(question));
  }
}
