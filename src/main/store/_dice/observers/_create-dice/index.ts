import { DiceModel } from '@domain/models';

import { CreateDiceObserver } from '@data/observers';

import { store } from '@main/store';

import { createDiceAction } from '../../actions';

export class DiceStoreCreateDiceSubscriber
  implements CreateDiceObserver.Subscriber
{
  public onCreateDice(dice: DiceModel): void {
    store.dispatch(createDiceAction(dice));
  }
}
