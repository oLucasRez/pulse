import { ForbiddenError, NotFoundError } from '@domain/errors';
import { RoundModel } from '@domain/models';
import { IGetRoundUsecase, IPassTurnUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class PassTurnUsecase implements IPassTurnUsecase {
  private readonly getRound: IGetRoundUsecase;
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({ getRound, roundDAO, roundHydrator }: Deps) {
    this.getRound = getRound;
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
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

    round = await this.roundHydrator.hydrate(dto);

    return round;
  }
}

type Deps = {
  getRound: IGetRoundUsecase;
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
