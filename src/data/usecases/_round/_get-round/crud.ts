import { RoundModel } from '@domain/models';
import { GetRoundUsecase } from '@domain/usecases';

import { RoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';

export class DAOGetRoundUsecase implements GetRoundUsecase {
  private readonly roundDAO: RoundDAO;

  public constructor(deps: DAOGetRoundUsecase.Deps) {
    this.roundDAO = deps.roundDAO;
  }

  public async execute(id: string): Promise<RoundModel | null> {
    const roundDTO = await this.roundDAO.read(id);

    return roundDTO ? RoundHydrator.hydrate(roundDTO) : null;
  }
}

export namespace DAOGetRoundUsecase {
  export type Deps = {
    roundDAO: RoundDAO;
  };
}
