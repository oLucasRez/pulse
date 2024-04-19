import { PlayerModel } from '@domain/models';
import { IGetPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class GetPlayerUsecase implements IGetPlayerUsecase {
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({ playerDAO, playerHydrator }: Deps) {
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
  }

  public async execute(id: string): Promise<PlayerModel | null> {
    const dto = await this.playerDAO.getByID(id);

    const player = dto ? await this.playerHydrator.hydrate(dto) : null;

    return player;
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
