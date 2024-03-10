import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { ChangePlayerUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { ChangePlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDChangePlayerUsecase implements ChangePlayerUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly changePlayerPublisher: ChangePlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDChangePlayerUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.changePlayerPublisher = deps.changePlayerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(
    payload: ChangePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, avatar } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const dto = await this.playerCRUD.update(myPlayer.id, {
      name,
      color,
      avatar,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.changePlayerPublisher.notifyChangePlayer(player);

    return player;
  }
}

export namespace CRUDChangePlayerUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    changePlayerPublisher: ChangePlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
