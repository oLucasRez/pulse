import { RoundModel } from '@domain/models';
import { IGetRoundUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class GetRoundUsecase implements IGetRoundUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({ roundDAO, roundHydrator }: Deps) {
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(id: string): Promise<RoundModel | null> {
    const dto = await this.roundDAO.getByID(id);

    const round = dto ? await this.roundHydrator.hydrate(dto) : null;

    return round;
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
