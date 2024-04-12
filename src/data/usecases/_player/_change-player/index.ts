import { NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import { IChangePlayerUsecase, IGetMyPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { ChangePlayerObserver } from '@data/observers';

export class ChangePlayerUsecase implements IChangePlayerUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly changePlayerPublisher: ChangePlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor({ getMyPlayer, changePlayerPublisher, playerDAO }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.changePlayerPublisher = changePlayerPublisher;
    this.playerDAO = playerDAO;
  }

  public async execute(
    payload: IChangePlayerUsecase.Payload,
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

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  changePlayerPublisher: ChangePlayerObserver.Publisher;
  playerDAO: IPlayerDAO;
};
