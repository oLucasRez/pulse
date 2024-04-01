import { SubjectModel } from '@domain/models';

import { FetchSubjectObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchSubjectAction } from '../../actions';

export class SubjectStoreFetchSubjectSubscriber
  implements FetchSubjectObserver.Subscriber
{
  public onFetchSubject(id: string, subject: SubjectModel | null): void {
    store.dispatch(fetchSubjectAction([id, subject]));
  }
}
