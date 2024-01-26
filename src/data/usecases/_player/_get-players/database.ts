import { PlayerModel } from '@domain/models';

import { GetPlayersUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseGetPlayersUsecase implements GetPlayersUsecase {
  public constructor(
    private readonly table: string,
    private readonly database: DatabaseProtocol,
  ) {}

  public async execute(): Promise<PlayerModel[]> {
    const players = await this.database.select<PlayerModel>(this.table);

    return players;
  }
}
