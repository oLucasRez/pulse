import { NotFoundError } from '@domain/errors';
import { RoundModel } from '@domain/models';
import {
  IGetLightSpotRoundUsecase,
  IGetPlayersUsecase,
  IPassLightSpotRoundTurnUsecase,
} from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class PassLightSpotRoundTurnUsecase
  implements IPassLightSpotRoundTurnUsecase
{
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly getLightSpotRound: IGetLightSpotRoundUsecase;
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({
    getPlayers,
    getLightSpotRound,
    roundDAO,
    roundHydrator,
  }: Deps) {
    this.getPlayers = getPlayers;
    this.getLightSpotRound = getLightSpotRound;
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(): Promise<RoundModel> {
    const round = await this.getLightSpotRound.execute();
    if (!round) throw new NotFoundError({ metadata: { entity: 'Round' } });

    const players = await this.getPlayers.execute();

    players.sort((player1, player2) => player1.order - player2.order);

    const nextPlayer = players.find(
      (player) => round.i !== null && player.order > round.i,
    );

    const dto = await this.roundDAO.update(round.id, {
      i: nextPlayer?.order ?? null,
      finished: nextPlayer === undefined,
    });

    return this.roundHydrator.hydrate(dto);
  }
}

type Deps = {
  getPlayers: IGetPlayersUsecase;
  getLightSpotRound: IGetLightSpotRoundUsecase;
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
