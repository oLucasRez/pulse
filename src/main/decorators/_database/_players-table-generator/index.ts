import { NotFoundError } from '@domain/errors';

import { GetCurrentGameUsecase } from '@domain/usecases';

import { TableGenerator } from '@data/protocols';

export class PlayersTableGeneratorDecorator implements TableGenerator {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly decorated?: TableGenerator;

  public constructor(deps: PlayersTableGeneratorDecorator.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.decorated = deps.decorated;
  }

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (table) return `${currentGame.id}/players/${table}`;
    return `${currentGame.id}/players`;
  }
}

export namespace PlayersTableGeneratorDecorator {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    decorated?: TableGenerator;
  };
}
