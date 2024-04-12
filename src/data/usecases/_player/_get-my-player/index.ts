import { ForbiddenError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import { IGetMeUsecase, IGetMyPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayerObserver } from '@data/observers';

export class GetMyPlayerUsecase implements IGetMyPlayerUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor({ getMe, fetchPlayerPublisher, playerDAO }: Deps) {
    this.getMe = getMe;
    this.fetchPlayerPublisher = fetchPlayerPublisher;
    this.playerDAO = playerDAO;
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

type Deps = {
  getMe: IGetMeUsecase;
  fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  playerDAO: IPlayerDAO;
};
