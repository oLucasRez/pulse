import { RoundModel } from '@domain/models';

import { CreateRoundObserver } from '@data/observers';

import { store } from '@main/store';

import { createRoundAction } from '../../actions';

export class RoundStoreCreateRoundSubscriber
  implements CreateRoundObserver.Subscriber
{
  public onCreateRound(round: RoundModel): void {
    store.dispatch(createRoundAction(round));
  }
}
