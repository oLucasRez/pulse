import { NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import { IChangePlayerUsecase, IGetMyPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class ChangePlayerUsecase implements IChangePlayerUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({ getMyPlayer, playerDAO, playerHydrator }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
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

    const player = await this.playerHydrator.hydrate(dto);

    return player;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
