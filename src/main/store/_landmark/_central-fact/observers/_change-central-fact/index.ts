import { CentralFactModel } from '@domain/models';

import { ChangeCentralFactObserver } from '@data/observers';

import { store } from '@main/store';

import { changeCentralFactAction } from '../../actions';

export class CentralFactStoreChangeCentralFactSubscriber
  implements ChangeCentralFactObserver.Subscriber
{
  public onChangeCentralFact(centralFact: CentralFactModel): void {
    store.dispatch(changeCentralFactAction(centralFact));
  }
}
