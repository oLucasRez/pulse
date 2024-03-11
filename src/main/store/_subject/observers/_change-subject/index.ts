import { SubjectModel } from '@domain/models';

import { ChangeSubjectObserver } from '@data/observers';

import { store } from '@main/store';

import { changeSubjectAction } from '../../actions';

export class SubjectStoreChangeSubjectSubscriber
  implements ChangeSubjectObserver.Subscriber
{
  public onChangeSubject(subject: SubjectModel): void {
    store.dispatch(changeSubjectAction(subject));
  }
}
