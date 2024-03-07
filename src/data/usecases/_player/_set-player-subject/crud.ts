import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { GetMyPlayerUsecase, SetPlayerSubjectUsecase } from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDSetPlayerSubjectUsecase implements SetPlayerSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly playerPublisher: PlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDSetPlayerSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.playerPublisher = deps.playerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(subjectID: string): Promise<PlayerModel> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const dto = await this.playerCRUD.update(myPlayer.id, {
      subjectID,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.playerPublisher.notifyChangePlayer(player);

    return player;
  }
}

export namespace CRUDSetPlayerSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    playerPublisher: PlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
