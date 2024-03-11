import { SubjectModel } from '@domain/models';

import { FetchSubjectsObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchSubjectsAction } from '../../actions';

export class SubjectStoreFetchSubjectsSubscriber
  implements FetchSubjectsObserver.Subscriber
{
  public onFetchSubjects(subjects: SubjectModel[]): void {
    store.dispatch(fetchSubjectsAction(subjects));
  }
}
