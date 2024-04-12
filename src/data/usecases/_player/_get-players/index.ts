import { PlayerModel } from '@domain/models';
import { IGetPlayersUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayersObserver } from '@data/observers';

export class GetPlayersUsecase implements IGetPlayersUsecase {
  private readonly fetchPlayersPublisher: FetchPlayersObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor({ fetchPlayersPublisher, playerDAO }: Deps) {
    this.fetchPlayersPublisher = fetchPlayersPublisher;
    this.playerDAO = playerDAO;
  }

  public async execute(
    options: IGetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const dto = includeBanned
      ? await this.playerDAO.getAll()
      : await this.playerDAO.getUnbanned();

    const players = dto.map(PlayerHydrator.hydrate);

    this.fetchPlayersPublisher.notifyFetchPlayers(players);

    if (includeBanned) return players;

    return players.filter((value) => !value.banned);
  }
}

type Deps = {
  fetchPlayersPublisher: FetchPlayersObserver.Publisher;
  playerDAO: IPlayerDAO;
};
