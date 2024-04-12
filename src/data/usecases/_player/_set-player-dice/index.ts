import { PlayerModel } from '@domain/models';
import { ISetPlayerDiceUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { ChangePlayerObserver } from '@data/observers';

export class SetPlayerDiceUsecase implements ISetPlayerDiceUsecase {
  private readonly changePlayerPublisher: ChangePlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor({ changePlayerPublisher, playerDAO }: Deps) {
    this.changePlayerPublisher = changePlayerPublisher;
    this.playerDAO = playerDAO;
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

type Deps = {
  changePlayerPublisher: ChangePlayerObserver.Publisher;
  playerDAO: IPlayerDAO;
};
