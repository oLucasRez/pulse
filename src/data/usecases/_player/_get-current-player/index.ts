import { PlayerModel } from '@domain/models';
import { IGetCurrentPlayerUsecase, IGetRoundUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class GetCurrentPlayerUsecase implements IGetCurrentPlayerUsecase {
  private readonly getRound: IGetRoundUsecase;
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHidrator: IPlayerHydrator;
  public constructor({ getRound, playerDAO, playerHidrator }: Deps) {
    this.getRound = getRound;
    this.playerDAO = playerDAO;
    this.playerHidrator = playerHidrator;
  }

  public async execute(): Promise<PlayerModel | null> {
    const round = await this.getRound.execute();

    if (!round) return null;
    if (round.i === null) return null;

    const dto = await this.playerDAO.getByOrder(round.i);

    return dto && this.playerHidrator.hydrate(dto);
  }
}

type Deps = {
  getRound: IGetRoundUsecase;
  playerDAO: IPlayerDAO;
  playerHidrator: IPlayerHydrator;
};
