import { RoundHydrator } from '@data/hydration/_round';

import { RoundModel } from '@domain/models';

import { ForbiddenError, NotFoundError } from '@domain/errors';

import {
  GetMeUsecase,
  GetRoundUsecase,
  PassTurnUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabasePassTurnUsecase implements PassTurnUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly getRound: GetRoundUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabasePassTurnUsecase.Deps) {
    this.getMe = deps.getMe;
    this.getRound = deps.getRound;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(id: string): Promise<RoundModel> {
    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'pass turn without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const round = await this.getRound.execute(id);
    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: id },
      });

    if (!round.currentPlayer) return round;

    let i = round.players.findIndex(
      (player) => player.id === round.currentPlayer?.id,
    );

    switch (me.currentGame.state) {
      case 'creating:subjects':
        i++;
        break;
      case 'creating:centralFact':
        i--;
        break;
      default:
        break;
    }

    const player = round.players[i];

    const table = await this.tableGenerator.getTable();

    const json = await this.database.update<RoundModel.JSON>(table, round.id, {
      currentPlayerID: player ? player.id : null,
    });

    return RoundHydrator.hydrate(json);
  }
}

export namespace DatabasePassTurnUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    getRound: GetRoundUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
