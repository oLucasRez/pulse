import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CreatePlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseCreatePlayerUsecase implements CreatePlayerUsecase {
  public constructor(
    private readonly table: string,
    private readonly database: DatabaseProtocol,
  ) {}

  public execute(payload: CreatePlayerUsecase.Payload): Promise<PlayerModel> {
    const { name, color, gameID, diceID } = payload;

    try {
      const player = this.database.insert<PlayerModel>(this.table, {
        name,
        color,
        gameID,
        diceID,
        subjectID: null,
      });

      return player;
    } catch {
      throw new FailedError('Failed to create player');
    }
  }
}
