import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayersUsecase } from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayersUsecase implements GetPlayersUsecase {
  private readonly playerPublisher: PlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayersUsecase.Deps) {
    this.playerPublisher = deps.playerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(
    options: GetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const dto = await this.playerCRUD.read();

    const players = dto.map(PlayerHydrator.hydrate);

    this.playerPublisher.notifyFetchPlayers(players);

    if (includeBanned) return players;

    return players.filter((value) => !value.banned);
  }
}

export namespace CRUDGetPlayersUsecase {
  export type Deps = {
    playerPublisher: PlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
