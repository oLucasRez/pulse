import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { ChangePlayerUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDChangePlayerUsecase implements ChangePlayerUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDChangePlayerUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(
    payload: ChangePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, avatar } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const playerDTO = await this.playerCRUD.update(myPlayer.id, {
      name,
      color,
      avatar,
    });

    return PlayerHydrator.hydrate(playerDTO);
  }
}

export namespace CRUDChangePlayerUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    playerCRUD: PlayerCRUD;
  };
}
