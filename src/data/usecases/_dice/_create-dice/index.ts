import { DiceModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { DiceHydrator } from '@data/hydration';

import { CreateDiceUsecase } from '@domain/usecases';

import { DiceCRUD } from '@data/cruds';

export class CreateDice implements CreateDiceUsecase {
  private readonly diceCRUD: DiceCRUD;

  public constructor(deps: CreateDice.Deps) {
    this.diceCRUD = deps.diceCRUD;
  }

  public async execute(payload: CreateDiceUsecase.Payload): Promise<DiceModel> {
    const { sides } = payload;

    if (![4, 6, 8, 10, 12].includes(sides))
      throw new ForbiddenError({
        message: `Dice must have 4, 6, 8, 10 or 12 sides; got ${sides}`,
        metadata: { prop: 'sides', value: sides },
      });

    const diceDTO = await this.diceCRUD.create({
      sides,
      value: null,
      position: null,
      ownerID: null,
    });

    return DiceHydrator.hydrate(diceDTO);
  }
}

export namespace CreateDice {
  export type Deps = {
    diceCRUD: DiceCRUD;
  };
}
