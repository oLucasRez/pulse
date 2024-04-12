import { AnswerModel } from '@domain/models';

import { CreateAnswerObserver } from '@data/observers';

import { store } from '@main/store';

import { createAnswerAction } from '../../actions';

export class AnswerStoreCreateAnswerSubscriber
  implements CreateAnswerObserver.Subscriber
{
  public onCreateAnswer(answer: AnswerModel): void {
    store.dispatch(createAnswerAction(answer));
  }
}
