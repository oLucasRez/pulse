import { NotFoundError } from '@domain/errors';
import { PlayerModel, RoundModel } from '@domain/models';
import {
  IGetPlayersUsecase,
  IGetRoundUsecase,
  IPassRoundTurnUsecase,
} from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class PassRoundTurnUsecase implements IPassRoundTurnUsecase {
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

  public async execute(): Promise<RoundModel> {
    const round = await this.getRound.execute();
    if (!round) throw new NotFoundError({ metadata: { entity: 'Round' } });

    const players = await this.getPlayers.execute();

    let nextPlayer: PlayerModel | undefined = undefined;

    if (round.clockwise === 'clockwise') {
      players.sort((player1, player2) => player1.order - player2.order);

      nextPlayer = players.find(
        (player) => round.i !== null && player.order > round.i,
      );
    } else {
      players.sort((player1, player2) => player2.order - player1.order);

      nextPlayer = players.find(
        (player) => round.i !== null && player.order < round.i,
      );
    }

    const dto = await this.roundDAO.update(round.id, {
      i: nextPlayer?.order ?? null,
      finished: nextPlayer === undefined,
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
