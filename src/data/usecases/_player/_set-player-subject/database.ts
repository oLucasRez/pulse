import { PlayerModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { GetMyPlayerUsecase, SetPlayerSubjectUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseSetPlayerSubjectUsecase
  implements SetPlayerSubjectUsecase
{
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseSetPlayerSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(subjectID: string): Promise<PlayerModel> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'set player subject' } });

    try {
      const table = await this.tableGenerator.getTable();

      const player = await this.database.update<PlayerModel.JSON>(
        table,
        myPlayer.id,
        { subjectID: subjectID },
      );

      return PlayerHydrator.hydrate(player);
    } catch {
      throw new FailedError({ metadata: { tried: 'change data of player' } });
    }
  }
}

export namespace DatabaseSetPlayerSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
