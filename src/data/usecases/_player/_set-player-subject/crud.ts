import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { GetMyPlayerUsecase, SetPlayerSubjectUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDSetPlayerSubjectUsecase implements SetPlayerSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDSetPlayerSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(subjectID: string): Promise<PlayerModel> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const playerDTO = await this.playerCRUD.update(myPlayer.id, {
      subjectID,
    });

    return PlayerHydrator.hydrate(playerDTO);
  }
}

export namespace CRUDSetPlayerSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    playerCRUD: PlayerCRUD;
  };
}
