import { CentralPulseModel } from '@domain/models';

import { CreateCentralPulseObserver } from '@data/observers';

import { store } from '@main/store';

import { createCentralPulseAction } from '../../actions';

export class CentralPulseStoreCreateCentralPulseSubscriber
  implements CreateCentralPulseObserver.Subscriber
{
  public onCreateCentralPulse(centralPulse: CentralPulseModel): void {
    store.dispatch(createCentralPulseAction(centralPulse));
  }
}
