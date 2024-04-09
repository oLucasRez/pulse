import { ForbiddenError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import { GetMeUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayerObserver } from '@data/observers';

export class DAOGetMyPlayerUsecase implements GetMyPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor(deps: DAOGetMyPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.fetchPlayerPublisher = deps.fetchPlayerPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'get my player' } });

    const dto = await this.playerDAO.getByUID(me.uid);

    const player = dto ? PlayerHydrator.hydrate(dto) : null;

    if (player) this.fetchPlayerPublisher.notifyFetchPlayer(player.id, player);

    return player;
  }
}

export namespace DAOGetMyPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    fetchPlayerPublisher: FetchPlayerObserver.Publisher;
    playerDAO: IPlayerDAO;
  };
}
