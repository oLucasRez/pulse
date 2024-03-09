import { PlayerModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { GetMeUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetMyPlayerUsecase implements GetMyPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly playerPublisher: PlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetMyPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.playerPublisher = deps.playerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'get my player' } });

    const dto = (await this.playerCRUD.read()).find(
      (playerDTO) => playerDTO.uid === me.uid,
    );

    const player = dto ? PlayerHydrator.hydrate(dto) : null;

    if (player) this.playerPublisher.notifyFetchPlayer(player.id, player);

    return player;
  }
}

export namespace CRUDGetMyPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    playerPublisher: PlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
