import { PlayerModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { ChangePlayerUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangePlayerUsecase implements ChangePlayerUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseChangePlayerUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(
    payload: ChangePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, avatar } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'change player data' } });

    try {
      const table = await this.tableGenerator.getTable();

      const player = await this.database.update<PlayerModel.JSON>(
        table,
        myPlayer.id,
        {
          name,
          color,
          avatar,
        },
      );

      return PlayerHydrator.hydrate(player);
    } catch {
      throw new FailedError({ metadata: { tried: 'change data of player' } });
    }
  }
}

export namespace DatabaseChangePlayerUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
