import { ForbiddenError, NotFoundError } from '@domain/errors';
import { PlayerModel, RoundModel } from '@domain/models';
import {
  IGetPlayersUsecase,
  IGetRoundUsecase,
  IStartRoundUsecase,
} from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class StartRoundUsecase implements IStartRoundUsecase {
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly getRound: IGetRoundUsecase;
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({ getPlayers, getRound, roundDAO, roundHydrator }: Deps) {
    this.getPlayers = getPlayers;
    this.getRound = getRound;
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(clockwise: RoundModel.Clockwise): Promise<RoundModel> {
    const round = await this.getRound.execute();

    if (!round) throw new NotFoundError({ metadata: { entity: 'Round' } });

    const players = await this.getPlayers.execute();

    const { firstPlayer, lastPlayer } = players.reduce(
      ({ firstPlayer, lastPlayer }, player) => {
        return {
          firstPlayer:
            !firstPlayer || firstPlayer.order > player.order
              ? player
              : firstPlayer,
          lastPlayer:
            !lastPlayer || lastPlayer.order < player.order
              ? player
              : lastPlayer,
        };
      },
      {
        firstPlayer: null as PlayerModel | null,
        lastPlayer: null as PlayerModel | null,
      },
    );

    if (!firstPlayer || !lastPlayer)
      throw new ForbiddenError({
        metadata: { tried: 'start round without players' },
      });

    let i: number | null = null;
    if (clockwise === 'clockwise') i = firstPlayer.order;
    if (clockwise === 'counterclockwise') i = lastPlayer.order;

    const dto = await this.roundDAO.update(round.id, {
      i,
      clockwise,
      finished: false,
    });

    return this.roundHydrator.hydrate(dto);
  }
}

type Deps = {
  getPlayers: IGetPlayersUsecase;
  getRound: IGetRoundUsecase;
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
