import { RoundModel } from '@domain/models';
import { CreateRoundUsecase } from '@domain/usecases';

import { RoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';

export class DAOCreateRoundUsecase implements CreateRoundUsecase {
  private readonly roundDAO: RoundDAO;

  public constructor(deps: DAOCreateRoundUsecase.Deps) {
    this.roundDAO = deps.roundDAO;
  }

  public async execute(
    payload: CreateRoundUsecase.Payload,
  ): Promise<RoundModel> {
    const { playerIDs } = payload;

    const roundDTO = await this.roundDAO.create({
      playerIDs,
      currentPlayerID: null,
    });

    return RoundHydrator.hydrate(roundDTO);
  }
}

export namespace DAOCreateRoundUsecase {
  export type Deps = {
    roundDAO: RoundDAO;
  };
}
