import { CentralPulseModel } from '@domain/models';

import { ChangeCentralPulseObserver } from '@data/observers';

import { store } from '@main/store';

import { changeCentralPulseAction } from '../../actions';

export class CentralPulseStoreChangeCentralPulseSubscriber
  implements ChangeCentralPulseObserver.Subscriber
{
  public onChangeCentralPulse(centralPulse: CentralPulseModel): void {
    store.dispatch(changeCentralPulseAction(centralPulse));
  }
}
