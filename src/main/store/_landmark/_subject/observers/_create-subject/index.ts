import { SubjectModel } from '@domain/models';

import { CreateSubjectObserver } from '@data/observers';

import { store } from '@main/store';

import { createSubjectAction } from '../../actions';

export class SubjectStoreCreateSubjectSubscriber
  implements CreateSubjectObserver.Subscriber
{
  public onCreateSubject(subject: SubjectModel): void {
    store.dispatch(createSubjectAction(subject));
  }
}
