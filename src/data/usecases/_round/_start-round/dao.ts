import { NotFoundError } from '@domain/errors';
import { RoundModel } from '@domain/models';
import { GetRoundUsecase, StartRoundUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';
import { ChangeRoundObserver } from '@data/observers';

export class DAOStartRoundUsecase implements StartRoundUsecase {
  private readonly getRound: GetRoundUsecase;
  private readonly roundDAO: IRoundDAO;
  private readonly changeRoundPublisher: ChangeRoundObserver.Publisher;

  public constructor(deps: DAOStartRoundUsecase.Deps) {
    this.getRound = deps.getRound;
    this.roundDAO = deps.roundDAO;
    this.changeRoundPublisher = deps.changeRoundPublisher;
  }

  public async execute(
    id: string,
    clockwise: RoundModel.Clockwise,
  ): Promise<RoundModel> {
    let round = await this.getRound.execute(id);
    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: id },
      });

    let i: number | null = null;
    if (clockwise === 'clockwise') i = 0;
    if (clockwise === 'counterclockwise') i = round.playerIDs.length - 1;

    const dto = await this.roundDAO.update(id, {
      i,
      clockwise,
      started: true,
      finished: false,
    });

    round = RoundHydrator.hydrate(dto);

    this.changeRoundPublisher.notifyChangeRound(round);

    return round;
  }
}

export namespace DAOStartRoundUsecase {
  export type Deps = {
    getRound: GetRoundUsecase;
    roundDAO: IRoundDAO;
    changeRoundPublisher: ChangeRoundObserver.Publisher;
  };
}
