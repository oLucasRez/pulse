import { NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  ChangeCentralPulseUsecase,
  GetCurrentGameUsecase,
  GetDiceUsecase,
  IChangeDiceUsecase,
  NextGameStateUsecase,
  RollDiceUsecase,
} from '@domain/usecases';

import { ChangeDiceObserver } from '@data/observers';

export class DAORollDiceUsecase implements RollDiceUsecase {
  private readonly changeCentralPulse: ChangeCentralPulseUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getDice: GetDiceUsecase;
  private readonly changeDice: IChangeDiceUsecase;
  private readonly nextGameState: NextGameStateUsecase;
  private readonly changeDicePublisher: ChangeDiceObserver.Publisher;

  public constructor({
    changeCentralPulse,
    getCurrentGame,
    getDice,
    changeDice,
    nextGameState,
    changeDicePublisher,
  }: DAORollDiceUsecase.Deps) {
    this.changeCentralPulse = changeCentralPulse;
    this.getCurrentGame = getCurrentGame;
    this.getDice = getDice;
    this.changeDice = changeDice;
    this.nextGameState = nextGameState;
    this.changeDicePublisher = changeDicePublisher;
  }

  public async execute(id: string): Promise<DiceModel> {
    let dice = await this.getDice.execute(id);

    if (!dice)
      throw new NotFoundError({
        metadata: { entity: 'Dice', prop: 'id', value: id },
      });

    const value = Math.ceil(Math.random() * dice.sides);

    dice = await this.changeDice.execute(id, { value });

    this.changeDicePublisher.notifyChangeDice(dice);

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const state = currentGame.state[0];

    if (state === 'creating:centralFact') {
      await this.changeCentralPulse.execute({ amount: value });
    } else if (state === 'creating:questions') {
      await this.nextGameState.execute();
    }

    return dice;
  }
}

export namespace DAORollDiceUsecase {
  export type Deps = {
    changeCentralPulse: ChangeCentralPulseUsecase;
    getCurrentGame: GetCurrentGameUsecase;
    getDice: GetDiceUsecase;
    changeDice: IChangeDiceUsecase;
    nextGameState: NextGameStateUsecase;
    changeDicePublisher: ChangeDiceObserver.Publisher;
  };
}
