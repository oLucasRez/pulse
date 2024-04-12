import { RoundModel } from '@domain/models';
import { ICreateRoundUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';
import { CreateRoundObserver } from '@data/observers';

export class CreateRoundUsecase implements ICreateRoundUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly createRoundPublisher: CreateRoundObserver.Publisher;

  public constructor({ roundDAO, createRoundPublisher }: Deps) {
    this.roundDAO = roundDAO;
    this.createRoundPublisher = createRoundPublisher;
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

    const round = RoundHydrator.hydrate(dto);

    this.createRoundPublisher.notifyCreateRound(round);

    return round;
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  createRoundPublisher: CreateRoundObserver.Publisher;
};
