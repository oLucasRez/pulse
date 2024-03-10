import { PlayerModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { GetMeUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { FetchPlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetMyPlayerUsecase implements GetMyPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetMyPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.fetchPlayerPublisher = deps.fetchPlayerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'get my player' } });

    const dto = (await this.playerCRUD.read()).find(
      (playerDTO) => playerDTO.uid === me.uid,
    );

    const player = dto ? PlayerHydrator.hydrate(dto) : null;

    if (player) this.fetchPlayerPublisher.notifyFetchPlayer(player.id, player);

    return player;
  }
}

export namespace CRUDGetMyPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    fetchPlayerPublisher: FetchPlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
