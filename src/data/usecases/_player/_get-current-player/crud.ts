import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import {
  GetCurrentPlayerUsecase,
  GetPlayerUsecase,
  GetRoundUsecase,
} from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

export class CRUDGetCurrentPlayerUsecase implements GetCurrentPlayerUsecase {
  private readonly getPlayer: GetPlayerUsecase;
  private readonly getRound: GetRoundUsecase;
  private readonly playerPublisher: PlayerObserver.Publisher;

  public constructor(deps: CRUDGetCurrentPlayerUsecase.Deps) {
    this.getPlayer = deps.getPlayer;
    this.getRound = deps.getRound;
    this.playerPublisher = deps.playerPublisher;
  }

  public async execute(roundID: string): Promise<PlayerModel | null> {
    const round = await this.getRound.execute(roundID);

    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: roundID },
      });

    if (!round.currentPlayerID) return null;

    const currentPlayer = await this.getPlayer.execute(round.currentPlayerID);

    this.playerPublisher.notifyFetchPlayer(
      round.currentPlayerID,
      currentPlayer,
    );

    return currentPlayer;
  }
}

export namespace CRUDGetCurrentPlayerUsecase {
  export type Deps = {
    getPlayer: GetPlayerUsecase;
    getRound: GetRoundUsecase;
    playerPublisher: PlayerObserver.Publisher;
  };
}