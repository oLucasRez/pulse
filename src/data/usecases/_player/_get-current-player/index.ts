import { NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import {
  IGetCurrentPlayerUsecase,
  IGetPlayerUsecase,
  IGetRoundUsecase,
} from '@domain/usecases';

import { FetchPlayerObserver } from '@data/observers';

export class GetCurrentPlayerUsecase implements IGetCurrentPlayerUsecase {
  private readonly getPlayer: IGetPlayerUsecase;
  private readonly getRound: IGetRoundUsecase;
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;

  public constructor({ getPlayer, getRound, fetchPlayerPublisher }: Deps) {
    this.getPlayer = getPlayer;
    this.getRound = getRound;
    this.fetchPlayerPublisher = fetchPlayerPublisher;
  }

  public async execute(roundID: string): Promise<PlayerModel | null> {
    const round = await this.getRound.execute(roundID);

    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: roundID },
      });

    if (round.i === null) return null;

    const currentPlayerID = round.playerIDs[round.i];
    if (!currentPlayerID) return null;

    const currentPlayer = await this.getPlayer.execute(currentPlayerID);

    this.fetchPlayerPublisher.notifyFetchPlayer(currentPlayerID, currentPlayer);

    return currentPlayer;
  }
}

type Deps = {
  getPlayer: IGetPlayerUsecase;
  getRound: IGetRoundUsecase;
  fetchPlayerPublisher: FetchPlayerObserver.Publisher;
};
