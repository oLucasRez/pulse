import { RoundHydrator } from '@data/hydration/_round';

import { RoundModel } from '@domain/models';

import { GetRoundUsecase } from '@domain/usecases';

import { RoundCRUD } from '@data/cruds';

export class CRUDGetRoundUsecase implements GetRoundUsecase {
  private readonly roundCRUD: RoundCRUD;

  public constructor(deps: CRUDGetRoundUsecase.Deps) {
    this.roundCRUD = deps.roundCRUD;
  }

  public async execute(id: string): Promise<RoundModel | null> {
    const roundDTO = await this.roundCRUD.read(id);

    return roundDTO ? RoundHydrator.hydrate(roundDTO) : null;
  }
}

export namespace CRUDGetRoundUsecase {
  export type Deps = {
    roundCRUD: RoundCRUD;
  };
}
