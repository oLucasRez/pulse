import { RoundModel } from '@domain/models';
import { CreateRoundUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';
import { CreateRoundObserver } from '@data/observers';

export class DAOCreateRoundUsecase implements CreateRoundUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly createRoundPublisher: CreateRoundObserver.Publisher;

  public constructor(deps: DAOCreateRoundUsecase.Deps) {
    this.roundDAO = deps.roundDAO;
    this.createRoundPublisher = deps.createRoundPublisher;
  }

  public async execute(
    payload: CreateRoundUsecase.Payload,
  ): Promise<RoundModel> {
    const { playerIDs } = payload;

    const dto = await this.roundDAO.create({
      playerIDs,
      i: null,
      clockwise: null,
      started: false,
      finished: false,
    });

    const round = RoundHydrator.hydrate(dto);

    this.createRoundPublisher.notifyCreateRound(round);

    return round;
  }
}

export namespace DAOCreateRoundUsecase {
  export type Deps = {
    roundDAO: IRoundDAO;
    createRoundPublisher: CreateRoundObserver.Publisher;
  };
}
