import { DiceModel } from '@domain/models';

import { FetchDiceObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchDiceAction } from '../../actions';

export class DiceStoreFetchDiceSubscriber
  implements FetchDiceObserver.Subscriber
{
  public onFetchDice(id: string, dice: DiceModel | null): void {
    store.dispatch(fetchDiceAction([id, dice]));
  }
}
