import { DiceModel } from '@domain/models';

import { DiceHydrator } from '@data/hydration';

import { GetDiceUsecase } from '@domain/usecases';

import { DiceCRUD } from '@data/cruds';

export class CRUDGetDiceUsecase implements GetDiceUsecase {
  private readonly diceCRUD: DiceCRUD;

  public constructor(deps: CRUDGetDiceUsecase.Deps) {
    this.diceCRUD = deps.diceCRUD;
  }

  public async execute(id: string): Promise<DiceModel | null> {
    const diceDTO = await this.diceCRUD.read(id);

    return diceDTO ? DiceHydrator.hydrate(diceDTO) : null;
  }
}

export namespace CRUDGetDiceUsecase {
  export type Deps = {
    diceCRUD: DiceCRUD;
  };
}
