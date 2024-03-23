import { CentralPulseModel } from '@domain/models';

import { FetchCentralPulseObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchCentralPulseAction } from '../../actions';

export class CentralPulseStoreFetchCentralPulseSubscriber
  implements FetchCentralPulseObserver.Subscriber
{
  public onFetchCentralPulse(centralPulse: CentralPulseModel | null): void {
    store.dispatch(fetchCentralPulseAction(centralPulse));
  }
}
