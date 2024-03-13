import { RoundModel } from '@domain/models';

import { ChangeRoundObserver } from '@data/observers';

import { store } from '@main/store';

import { changeRoundAction } from '../../actions';

export class RoundStoreChangeRoundSubscriber
  implements ChangeRoundObserver.Subscriber
{
  public onChangeRound(round: RoundModel): void {
    store.dispatch(changeRoundAction(round));
  }
}
