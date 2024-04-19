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

  public async execute(
    payload: ICreateRoundUsecase.Payload,
  ): Promise<RoundModel> {
    const { playerIDs } = payload;

    const dto = await this.roundDAO.create({
      playerIDs,
      i: null,
      clockwise: null,
      started: false,
      finished: false,
    });

    const round = await this.roundHydrator.hydrate(dto);

    return round;
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
