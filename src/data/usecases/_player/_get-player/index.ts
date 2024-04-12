import { PlayerModel } from '@domain/models';
import { IGetPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayerObserver } from '@data/observers';

export class GetPlayerUsecase implements IGetPlayerUsecase {
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor({ fetchPlayerPublisher, playerDAO }: Deps) {
    this.fetchPlayerPublisher = fetchPlayerPublisher;
    this.playerDAO = playerDAO;
  }

  public async execute(id: string): Promise<PlayerModel | null> {
    const dto = await this.playerDAO.getByID(id);

    const player = dto ? PlayerHydrator.hydrate(dto) : null;

    this.fetchPlayerPublisher.notifyFetchPlayer(id, player);

    return player;
  }
}

type Deps = {
  fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  playerDAO: IPlayerDAO;
};
