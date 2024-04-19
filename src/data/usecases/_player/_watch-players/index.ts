import { IWatchPlayersUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class WatchPlayersUsecase implements IWatchPlayersUsecase {
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({ playerDAO, playerHydrator }: Deps) {
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
  }

  public async execute(
    callback: IWatchPlayersUsecase.Callback,
  ): Promise<IWatchPlayersUsecase.Response> {
    const unsubscribe = this.playerDAO.watch(async (dtos) => {
      const players = await Promise.all(
        dtos.map((dto) => this.playerHydrator.hydrate(dto)),
      );

      callback(players);
    });

    return unsubscribe;
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
