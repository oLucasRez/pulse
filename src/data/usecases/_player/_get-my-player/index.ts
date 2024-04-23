import { ForbiddenError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import { IGetMeUsecase, IGetMyPlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class GetMyPlayerUsecase implements IGetMyPlayerUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({ getMe, playerDAO, playerHydrator }: Deps) {
    this.getMe = getMe;
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'get my player' } });

    const dto = await this.playerDAO.getByUID(me.uid);

    return dto ? await this.playerHydrator.hydrate(dto) : null;
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
