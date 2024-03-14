import { NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import {
  GetCurrentPlayerUsecase,
  GetPlayerUsecase,
  GetRoundUsecase,
} from '@domain/usecases';

import { FetchPlayerObserver } from '@data/observers';

export class DAOGetCurrentPlayerUsecase implements GetCurrentPlayerUsecase {
  private readonly getPlayer: GetPlayerUsecase;
  private readonly getRound: GetRoundUsecase;
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;

  public constructor(deps: DAOGetCurrentPlayerUsecase.Deps) {
    this.getPlayer = deps.getPlayer;
    this.getRound = deps.getRound;
    this.fetchPlayerPublisher = deps.fetchPlayerPublisher;
  }

  public async execute(roundID: string): Promise<PlayerModel | null> {
    const round = await this.getRound.execute(roundID);

    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: roundID },
      });

    // @todo: corrigir isso
    if (!round.playerIDs[0]) return null;

    const currentPlayer = await this.getPlayer.execute(round.playerIDs[0]);

    this.fetchPlayerPublisher.notifyFetchPlayer(
      round.playerIDs[0],
      currentPlayer,
    );

    return currentPlayer;
  }
}

export namespace DAOGetCurrentPlayerUsecase {
  export type Deps = {
    getPlayer: GetPlayerUsecase;
    getRound: GetRoundUsecase;
    fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  };
}