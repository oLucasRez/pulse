import { PlayerModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { GetMeUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetMyPlayerUsecase implements GetMyPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetMyPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'get my player' } });

    const playerDTOs = (await this.playerCRUD.read()).find(
      (playerDTO) => playerDTO.uid === me.uid,
    );

    return playerDTOs ? PlayerHydrator.hydrate(playerDTOs) : null;
  }
}

export namespace CRUDGetMyPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    playerCRUD: PlayerCRUD;
  };
}
