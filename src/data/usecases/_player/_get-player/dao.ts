import { PlayerModel } from '@domain/models';
import { GetPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayerObserver } from '@data/observers';

export class DAOGetPlayerUsecase implements GetPlayerUsecase {
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor(deps: DAOGetPlayerUsecase.Deps) {
    this.fetchPlayerPublisher = deps.fetchPlayerPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(id: string): Promise<PlayerModel | null> {
    const dto = await this.playerDAO.getByID(id);

    const player = dto ? PlayerHydrator.hydrate(dto) : null;

    this.fetchPlayerPublisher.notifyFetchPlayer(id, player);

    return player;
  }
}

export namespace DAOGetPlayerUsecase {
  export type Deps = {
    fetchPlayerPublisher: FetchPlayerObserver.Publisher;
    playerDAO: IPlayerDAO;
  };
}
