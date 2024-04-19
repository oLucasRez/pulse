import { PlayerModel } from '@domain/models';
import { ISetPlayerDiceUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class SetPlayerDiceUsecase implements ISetPlayerDiceUsecase {
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({ playerDAO, playerHydrator }: Deps) {
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
  }

  public async execute(id: string, diceID: string): Promise<PlayerModel> {
    const dto = await this.playerDAO.update(id, {
      diceID,
    });

    const player = await this.playerHydrator.hydrate(dto);

    return player;
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
