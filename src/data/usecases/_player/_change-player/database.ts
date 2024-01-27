import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { ChangePlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseChangePlayerUsecase implements ChangePlayerUsecase {
  public constructor(
    private readonly table: string,
    private readonly database: DatabaseProtocol,
  ) {}

  public execute(
    id: string,
    payload: ChangePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color } = payload;

    try {
      const player = this.database.update<PlayerModel>(this.table, {
        id,

        name,
        color,
      });

      return player;
    } catch {
      throw new FailedError(`Failed to change data of player ${id}`);
    }
  }
}
