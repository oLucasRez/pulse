import { ForbiddenError, NotFoundError } from '@domain/errors';
import { RoundModel } from '@domain/models';
import { GetRoundUsecase, PassTurnUsecase } from '@domain/usecases';

import { RoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';
import { ChangeRoundObserver } from '@data/observers';

export class DAOPassTurnUsecase implements PassTurnUsecase {
  private readonly getRound: GetRoundUsecase;
  private readonly roundDAO: RoundDAO;
  private readonly changeRoundPublisher: ChangeRoundObserver.Publisher;

  public constructor(deps: DAOPassTurnUsecase.Deps) {
    this.getRound = deps.getRound;
    this.roundDAO = deps.roundDAO;
    this.changeRoundPublisher = deps.changeRoundPublisher;
  }

  public async execute(id: string): Promise<RoundModel> {
    let round = await this.getRound.execute(id);
    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: id },
      });

    let { i } = round;

    if (i === null)
      throw new ForbiddenError({
        metadata: { tried: 'pass turn for a non started round' },
      });

    if (round.clockwise === 'clockwise') i++;
    else i--;

    if (i < 0 || i >= round.playerIDs.length) i = null;

    const dto = await this.roundDAO.update(round.id, {
      i,
      finished: i === null,
      started: i !== null,
    });

    round = RoundHydrator.hydrate(dto);

    this.changeRoundPublisher.notifyChangeRound(round);

    return round;
  }
}

export namespace DAOPassTurnUsecase {
  export type Deps = {
    getRound: GetRoundUsecase;
    roundDAO: RoundDAO;
    changeRoundPublisher: ChangeRoundObserver.Publisher;
  };
}
