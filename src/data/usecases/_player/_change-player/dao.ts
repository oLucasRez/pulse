import { NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import { ChangePlayerUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { PlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { ChangePlayerObserver } from '@data/observers';

export class DAOChangePlayerUsecase implements ChangePlayerUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly changePlayerPublisher: ChangePlayerObserver.Publisher;
  private readonly playerDAO: PlayerDAO;

  public constructor(deps: DAOChangePlayerUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.changePlayerPublisher = deps.changePlayerPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(
    payload: ChangePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, avatar } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const dto = await this.playerDAO.update(myPlayer.id, {
      name,
      color,
      avatar,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.changePlayerPublisher.notifyChangePlayer(player);

    return player;
  }
}

export namespace DAOChangePlayerUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    changePlayerPublisher: ChangePlayerObserver.Publisher;
    playerDAO: PlayerDAO;
  };
}
