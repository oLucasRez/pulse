import { NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  ChangeDiceUsecase,
  GetDiceUsecase,
  RollDiceUsecase,
} from '@domain/usecases';
import { Vector } from '@domain/utils';

import { ChangeDiceObserver } from '@data/observers';

export class DAORollDiceUsecase implements RollDiceUsecase {
  private readonly changeDice: ChangeDiceUsecase;
  private readonly getDice: GetDiceUsecase;
  private readonly changeDicePublisher: ChangeDiceObserver.Publisher;

  public constructor(deps: DAORollDiceUsecase.Deps) {
    this.changeDice = deps.changeDice;
    this.getDice = deps.getDice;
    this.changeDicePublisher = deps.changeDicePublisher;
  }

  public async execute(id: string, position?: Vector): Promise<DiceModel> {
    let dice = await this.getDice.execute(id);

    if (!dice)
      throw new NotFoundError({
        metadata: { entity: 'Dice', prop: 'id', value: id },
      });

    const value = Math.ceil(Math.random() * dice.sides);

    dice = await this.changeDice.execute(id, { value, position });

    this.changeDicePublisher.notifyChangeDice(dice);

    return dice;
  }
}

export namespace DAORollDiceUsecase {
  export type Deps = {
    changeDice: ChangeDiceUsecase;
    getDice: GetDiceUsecase;
    changeDicePublisher: ChangeDiceObserver.Publisher;
  };
}
