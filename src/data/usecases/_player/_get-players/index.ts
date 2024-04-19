import { PlayerModel } from '@domain/models';
import { IGetPlayersUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class GetPlayersUsecase implements IGetPlayersUsecase {
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({ playerDAO, playerHydrator }: Deps) {
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
  }

  public async execute(
    options: IGetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const dtos = includeBanned
      ? await this.playerDAO.getAll()
      : await this.playerDAO.getUnbanned();

    const players = await Promise.all(
      dtos.map((dto) => this.playerHydrator.hydrate(dto)),
    );

    if (includeBanned) return players;

    return players.filter((value) => !value.banned);
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
