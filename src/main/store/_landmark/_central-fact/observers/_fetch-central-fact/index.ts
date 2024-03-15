import { CentralFactModel } from '@domain/models';

import { FetchCentralFactObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchCentralFactAction } from '../../actions';

export class CentralFactStoreFetchCentralFactSubscriber
  implements FetchCentralFactObserver.Subscriber
{
  public onFetchCentralFact(centralFact: CentralFactModel | null): void {
    store.dispatch(fetchCentralFactAction(centralFact));
  }
}
