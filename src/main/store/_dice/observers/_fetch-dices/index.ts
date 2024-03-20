import { DiceModel } from '@domain/models';

import { FetchDicesObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchDicesAction } from '../../actions';

export class DiceStoreFetchDicesSubscriber
  implements FetchDicesObserver.Subscriber
{
  public onFetchDices(dices: DiceModel[]): void {
    store.dispatch(fetchDicesAction(dices));
  }
}
