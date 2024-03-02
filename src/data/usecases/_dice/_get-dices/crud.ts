import { DiceModel } from '@domain/models';

import { DiceHydrator } from '@data/hydration';

import { GetDicesUsecase } from '@domain/usecases';

import { DiceCRUD } from '@data/cruds';

export class CRUDGetDicesUsecase implements GetDicesUsecase {
  private readonly diceCRUD: DiceCRUD;

  public constructor(deps: CRUDGetDicesUsecase.Deps) {
    this.diceCRUD = deps.diceCRUD;
  }

  public async execute(): Promise<DiceModel[]> {
    const diceDTOs = await this.diceCRUD.read();

    return diceDTOs.map(DiceHydrator.hydrate);
  }
}

export namespace CRUDGetDicesUsecase {
  export type Deps = {
    diceCRUD: DiceCRUD;
  };
}
