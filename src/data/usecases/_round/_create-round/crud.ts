import { RoundHydrator } from '@data/hydration/_round';

import { RoundModel } from '@domain/models';

import { CreateRoundUsecase } from '@domain/usecases';

import { RoundCRUD } from '@data/cruds';

export class CRUDCreateRoundUsecase implements CreateRoundUsecase {
  private readonly roundCRUD: RoundCRUD;

  public constructor(deps: CRUDCreateRoundUsecase.Deps) {
    this.roundCRUD = deps.roundCRUD;
  }

  public async execute(
    payload: CreateRoundUsecase.Payload,
  ): Promise<RoundModel> {
    const { playerIDs } = payload;

    const roundDTO = await this.roundCRUD.create({
      playerIDs,
      currentPlayerID: null,
    });

    return RoundHydrator.hydrate(roundDTO);
  }
}

export namespace CRUDCreateRoundUsecase {
  export type Deps = {
    roundCRUD: RoundCRUD;
  };
}
