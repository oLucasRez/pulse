import { RoundModel } from '@domain/models';
import { ICreateRoundUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class CreateRoundUsecase implements ICreateRoundUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({ roundDAO, roundHydrator }: Deps) {
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(): Promise<RoundModel> {
    const dto = await this.roundDAO.create({
      i: null,
      clockwise: null,
      finished: false,
    });

    return this.roundHydrator.hydrate(dto);
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
