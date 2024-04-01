import { NotFoundError } from '@domain/errors';
import { GetCurrentGameUsecase } from '@domain/usecases';

import { TableGenerator } from '@data/protocols';

export class SubjectPulsesTableGeneratorDecorator implements TableGenerator {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly decorated?: TableGenerator;

  public constructor(deps: SubjectPulsesTableGeneratorDecorator.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.decorated = deps.decorated;
  }

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (table) return `${currentGame.id}/subjectPulses/${table}`;
    return `${currentGame.id}/subjectPulses`;
  }
}

export namespace SubjectPulsesTableGeneratorDecorator {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    decorated?: TableGenerator;
  };
}
