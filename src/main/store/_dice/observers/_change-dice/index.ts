import { DiceModel } from '@domain/models';

import { ChangeDiceObserver } from '@data/observers';

import { store } from '@main/store';

import { changeDiceAction } from '../../actions';

export class DiceStoreChangeDiceSubscriber
  implements ChangeDiceObserver.Subscriber
{
  public onChangeDice(dice: DiceModel): void {
    store.dispatch(changeDiceAction(dice));
  }
}
