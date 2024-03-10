import { PlayerModel } from '@domain/models';
import { SetPlayerDiceUsecase } from '@domain/usecases';

import { PlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { ChangePlayerObserver } from '@data/observers';

export class DAOSetPlayerDiceUsecase implements SetPlayerDiceUsecase {
  private readonly changePlayerPublisher: ChangePlayerObserver.Publisher;
  private readonly playerDAO: PlayerDAO;

  public constructor(deps: DAOSetPlayerDiceUsecase.Deps) {
    this.changePlayerPublisher = deps.changePlayerPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(id: string, diceID: string): Promise<PlayerModel> {
    const dto = await this.playerDAO.update(id, {
      diceID,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.changePlayerPublisher.notifyChangePlayer(player);

    return player;
  }
}

export namespace DAOSetPlayerDiceUsecase {
  export type Deps = {
    changePlayerPublisher: ChangePlayerObserver.Publisher;
    playerDAO: PlayerDAO;
  };
}
