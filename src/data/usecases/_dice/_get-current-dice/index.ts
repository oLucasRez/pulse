import { DiceModel } from '@domain/models';
import {
  IGetCurrentDiceUsecase,
  IGetCurrentPlayerUsecase,
  IGetDiceUsecase,
} from '@domain/usecases';

import { FetchDiceObserver } from '@data/observers';

export class GetCurrentDiceUsecase implements IGetCurrentDiceUsecase {
  private readonly getCurrentPlayer: IGetCurrentPlayerUsecase;
  private readonly getDice: IGetDiceUsecase;
  private readonly fetchDicePublisher: FetchDiceObserver.Publisher;

  public constructor({ getCurrentPlayer, getDice, fetchDicePublisher }: Deps) {
    this.getCurrentPlayer = getCurrentPlayer;
    this.getDice = getDice;
    this.fetchDicePublisher = fetchDicePublisher;
  }

  public async execute(roundID: string): Promise<DiceModel | null> {
    const currentPlayer = await this.getCurrentPlayer.execute(roundID);

    if (!currentPlayer?.diceID) return null;

    const dice = await this.getDice.execute(currentPlayer.diceID);

    this.fetchDicePublisher.notifyFetchDice(currentPlayer.diceID, dice);

    return dice;
  }
}

type Deps = {
  getCurrentPlayer: IGetCurrentPlayerUsecase;
  getDice: IGetDiceUsecase;
  fetchDicePublisher: FetchDiceObserver.Publisher;
};
