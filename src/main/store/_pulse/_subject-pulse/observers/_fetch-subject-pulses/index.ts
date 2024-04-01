import { SubjectPulseModel } from '@domain/models';

import { FetchSubjectPulsesObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchSubjectPulsesAction } from '../../actions';

export class SubjectPulseStoreFetchSubjectPulsesSubscriber
  implements FetchSubjectPulsesObserver.Subscriber
{
  public onFetchSubjectPulses(subjectPulses: SubjectPulseModel[]): void {
    store.dispatch(fetchSubjectPulsesAction(subjectPulses));
  }
}
