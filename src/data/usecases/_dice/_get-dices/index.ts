import { DiceModel } from '@domain/models';

import { DiceHydrator } from '@data/hydration';

import { GetDicesUsecase } from '@domain/usecases';

import { DiceCRUD } from '@data/cruds';

export class GetDices implements GetDicesUsecase {
  private readonly diceCRUD: DiceCRUD;

  public constructor(deps: GetDices.Deps) {
    this.diceCRUD = deps.diceCRUD;
  }

  public async execute(): Promise<DiceModel[]> {
    const diceDTOs = await this.diceCRUD.read();

    return Promise.all(diceDTOs.map(DiceHydrator.hydrate));
  }
}

export namespace GetDices {
  export type Deps = {
    diceCRUD: DiceCRUD;
  };
}
