import { ForbiddenError, NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  IGetCurrentLightSpotDiceUsecase,
  IGetCurrentPlayerUsecase,
  IGetDiceUsecase,
} from '@domain/usecases';

export class GetCurrentLightSpotDiceUsecase
  implements IGetCurrentLightSpotDiceUsecase
{
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
    if (!currentGame.lightSpotRoundID)
      throw new ForbiddenError({
        metadata: {
          tried: 'get current-light-spot-dice without light-spot-round',
        },
      });

    const currentPlayer = await this.getCurrentPlayer.execute(
      currentGame.lightSpotRoundID,
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
