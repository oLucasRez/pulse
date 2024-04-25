import { ForbiddenError, NotFoundError } from '@domain/errors';
import { PlayerModel, RoundModel } from '@domain/models';
import {
  IGetLightSpotRoundUsecase,
  IGetPlayersUsecase,
  IStartLightSpotRoundUsecase,
} from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class StartLightSpotRoundUsecase implements IStartLightSpotRoundUsecase {
  private readonly getLightSpotRound: IGetLightSpotRoundUsecase;
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({
    getLightSpotRound,
    getPlayers,
    roundDAO,
    roundHydrator,
  }: Deps) {
    this.getLightSpotRound = getLightSpotRound;
    this.getPlayers = getPlayers;
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(): Promise<RoundModel> {
    const lightSpotRound = await this.getLightSpotRound.execute();

    if (!lightSpotRound)
      throw new NotFoundError({ metadata: { entity: 'LightSpotRound' } });

    const players = await this.getPlayers.execute();

    const firstPlayer = players.reduce(
      (firstPlayer, player) =>
        !firstPlayer || firstPlayer.order > player.order ? player : firstPlayer,
      null as PlayerModel | null,
    );

    if (!firstPlayer)
      throw new ForbiddenError({
        metadata: { tried: 'start light-spot-round without players' },
      });

    const dto = await this.roundDAO.update(lightSpotRound.id, {
      i: firstPlayer.order,
      clockwise: 'clockwise',
      finished: false,
    });

    return this.roundHydrator.hydrate(dto);
  }
}

type Deps = {
  getLightSpotRound: IGetLightSpotRoundUsecase;
  getPlayers: IGetPlayersUsecase;
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
