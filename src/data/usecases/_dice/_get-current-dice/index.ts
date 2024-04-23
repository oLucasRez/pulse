import { ForbiddenError, NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  IGetCurrentDiceUsecase,
  IGetCurrentGameUsecase,
  IGetCurrentPlayerUsecase,
  IGetDiceUsecase,
} from '@domain/usecases';

export class GetCurrentDiceUsecase implements IGetCurrentDiceUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getCurrentPlayer: IGetCurrentPlayerUsecase;
  private readonly getDice: IGetDiceUsecase;
  public constructor({ getCurrentGame, getCurrentPlayer, getDice }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getCurrentPlayer = getCurrentPlayer;
    this.getDice = getDice;
  }

  public async execute(): Promise<DiceModel | null> {
    const currentGame = await this.getCurrentGame.execute();
    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });
    if (!currentGame.roundID)
      throw new ForbiddenError({
        metadata: { tried: 'get current-dice without round' },
      });

    const currentPlayer = await this.getCurrentPlayer.execute(
      currentGame.roundID,
    );

    if (!currentPlayer?.diceID) return null;

    const dice = await this.getDice.execute(currentPlayer.diceID);

    return dice;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getCurrentPlayer: IGetCurrentPlayerUsecase;
  getDice: IGetDiceUsecase;
};
