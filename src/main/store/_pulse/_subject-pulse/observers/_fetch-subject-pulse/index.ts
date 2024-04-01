import { SubjectPulseModel } from '@domain/models';

import { FetchSubjectPulseObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchSubjectPulseAction } from '../../actions';

export class SubjectPulseStoreFetchSubjectPulseSubscriber
  implements FetchSubjectPulseObserver.Subscriber
{
  public onFetchSubjectPulse(
    id: string,
    subjectPulse: SubjectPulseModel | null,
  ): void {
    store.dispatch(fetchSubjectPulseAction([id, subjectPulse]));
  }
}
