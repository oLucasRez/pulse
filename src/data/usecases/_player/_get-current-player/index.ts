import { NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import {
  IGetCurrentPlayerUsecase,
  IGetPlayerUsecase,
  IGetRoundUsecase,
} from '@domain/usecases';

export class GetCurrentPlayerUsecase implements IGetCurrentPlayerUsecase {
  private readonly getPlayer: IGetPlayerUsecase;
  private readonly getRound: IGetRoundUsecase;
  public constructor({ getPlayer, getRound }: Deps) {
    this.getPlayer = getPlayer;
    this.getRound = getRound;
  }

  public async execute(roundID: string): Promise<PlayerModel | null> {
    const round = await this.getRound.execute(roundID);

    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: roundID },
      });

    if (round.i === null) return null;

    const currentPlayerID = round.playerIDs[round.i];
    if (!currentPlayerID) return null;

    const currentPlayer = await this.getPlayer.execute(currentPlayerID);

    return currentPlayer;
  }
}

type Deps = {
  getPlayer: IGetPlayerUsecase;
  getRound: IGetRoundUsecase;
};
