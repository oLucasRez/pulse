import { ForbiddenError } from '@domain/errors';

import { GetCurrentGameUsecase } from '@domain/usecases';

import { TableGenerator } from '@data/protocols';

export class SubjectsTableGeneratorDecorator implements TableGenerator {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly decorated?: TableGenerator;

  public constructor(deps: SubjectsTableGeneratorDecorator.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.decorated = deps.decorated;
  }

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new ForbiddenError({
        metadata: { tried: 'access subjects table' },
      });

    if (table) return `${currentGame.id}/subjects/${table}`;
    return `${currentGame.id}/subjects`;
  }
}

export namespace SubjectsTableGeneratorDecorator {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    decorated?: TableGenerator;
  };
}
