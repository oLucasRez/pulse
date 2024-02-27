import { ForbiddenError, NotFoundError } from '@domain/errors';

import { GetMeUsecase } from '@domain/usecases';

import { TableGenerator } from '@data/protocols';

export class SubjectsTableGeneratorDecorator implements TableGenerator {
  private readonly getMe: GetMeUsecase;
  private readonly decorated?: TableGenerator;

  public constructor(deps: SubjectsTableGeneratorDecorator.Deps) {
    this.getMe = deps.getMe;
    this.decorated = deps.decorated;
  }

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'access subjects table without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (table) return `${me.currentGame.id}/subjects/${table}`;
    return `${me.currentGame.id}/subjects`;
  }
}

export namespace SubjectsTableGeneratorDecorator {
  export type Deps = {
    getMe: GetMeUsecase;
    decorated?: TableGenerator;
  };
}
