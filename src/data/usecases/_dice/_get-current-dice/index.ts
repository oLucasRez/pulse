import { DiceModel } from '@domain/models';
import {
  IGetCurrentDiceUsecase,
  IGetCurrentPlayerUsecase,
  IGetDiceUsecase,
} from '@domain/usecases';

export class GetCurrentDiceUsecase implements IGetCurrentDiceUsecase {
  private readonly getCurrentPlayer: IGetCurrentPlayerUsecase;
  private readonly getDice: IGetDiceUsecase;
  public constructor({ getCurrentPlayer, getDice }: Deps) {
    this.getCurrentPlayer = getCurrentPlayer;
    this.getDice = getDice;
  }

  public async execute(roundID: string): Promise<DiceModel | null> {
    const currentPlayer = await this.getCurrentPlayer.execute(roundID);

    if (!currentPlayer?.diceID) return null;

    const dice = await this.getDice.execute(currentPlayer.diceID);

    return dice;
  }
}

type Deps = {
  getCurrentPlayer: IGetCurrentPlayerUsecase;
  getDice: IGetDiceUsecase;
};
