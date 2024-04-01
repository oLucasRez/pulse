import { SubjectPulseModel } from '@domain/models';

import { CreateSubjectPulseObserver } from '@data/observers';

import { store } from '@main/store';

import { createSubjectPulseAction } from '../../actions';

export class SubjectPulseStoreCreateSubjectPulseSubscriber
  implements CreateSubjectPulseObserver.Subscriber
{
  public onCreateSubjectPulse(subjectPulse: SubjectPulseModel): void {
    store.dispatch(createSubjectPulseAction(subjectPulse));
  }
}
