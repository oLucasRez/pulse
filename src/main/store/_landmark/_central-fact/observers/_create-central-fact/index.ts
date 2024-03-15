import { CentralFactModel } from '@domain/models';

import { CreateCentralFactObserver } from '@data/observers';

import { store } from '@main/store';

import { createCentralFactAction } from '../../actions';

export class CentralFactStoreCreateCentralFactSubscriber
  implements CreateCentralFactObserver.Subscriber
{
  public onCreateCentralFact(centralFact: CentralFactModel): void {
    store.dispatch(createCentralFactAction(centralFact));
  }
}
