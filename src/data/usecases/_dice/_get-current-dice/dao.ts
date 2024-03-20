import { DiceModel } from '@domain/models';
import {
  GetCurrentDiceUsecase,
  GetCurrentPlayerUsecase,
  GetDiceUsecase,
} from '@domain/usecases';

import { FetchDiceObserver } from '@data/observers';

export class DAOGetCurrentDiceUsecase implements GetCurrentDiceUsecase {
  private readonly getCurrentPlayer: GetCurrentPlayerUsecase;
  private readonly getDice: GetDiceUsecase;
  private readonly fetchDicePublisher: FetchDiceObserver.Publisher;

  public constructor(deps: DAOGetCurrentDiceUsecase.Deps) {
    this.getCurrentPlayer = deps.getCurrentPlayer;
    this.getDice = deps.getDice;
    this.fetchDicePublisher = deps.fetchDicePublisher;
  }

  public async execute(roundID: string): Promise<DiceModel | null> {
    const currentPlayer = await this.getCurrentPlayer.execute(roundID);

    if (!currentPlayer?.diceID) return null;

    const dice = await this.getDice.execute(currentPlayer.diceID);

    this.fetchDicePublisher.notifyFetchDice(currentPlayer.diceID, dice);

    return dice;
  }
}

export namespace DAOGetCurrentDiceUsecase {
  export type Deps = {
    getCurrentPlayer: GetCurrentPlayerUsecase;
    getDice: GetDiceUsecase;
    fetchDicePublisher: FetchDiceObserver.Publisher;
  };
}
