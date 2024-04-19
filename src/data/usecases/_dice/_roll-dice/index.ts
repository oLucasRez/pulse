import { NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  IChangeCentralPulseUsecase,
  IChangeDiceUsecase,
  IGetCurrentGameUsecase,
  IGetDiceUsecase,
  INextGameStateUsecase,
  IRollDiceUsecase,
} from '@domain/usecases';

export class RollDiceUsecase implements IRollDiceUsecase {
  private readonly changeCentralPulse: IChangeCentralPulseUsecase;
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getDice: IGetDiceUsecase;
  private readonly changeDice: IChangeDiceUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  public constructor({
    changeCentralPulse,
    getCurrentGame,
    getDice,
    changeDice,
    nextGameState,
  }: Deps) {
    this.changeCentralPulse = changeCentralPulse;
    this.getCurrentGame = getCurrentGame;
    this.getDice = getDice;
    this.changeDice = changeDice;
    this.nextGameState = nextGameState;
  }

  public async execute(id: string): Promise<DiceModel> {
    let dice = await this.getDice.execute(id);

    if (!dice)
      throw new NotFoundError({
        metadata: { entity: 'Dice', prop: 'id', value: id },
      });

    const value = Math.ceil(Math.random() * dice.sides);

    dice = await this.changeDice.execute(id, { value });

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const [state] = currentGame.state;

    if (state === 'creating:centralFact')
      await this.changeCentralPulse.execute({ amount: value });
    else await this.nextGameState.execute();

    return dice;
  }
}

type Deps = {
  changeCentralPulse: IChangeCentralPulseUsecase;
  getCurrentGame: IGetCurrentGameUsecase;
  getDice: IGetDiceUsecase;
  changeDice: IChangeDiceUsecase;
  nextGameState: INextGameStateUsecase;
};
