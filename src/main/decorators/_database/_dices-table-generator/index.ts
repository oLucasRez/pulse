import { ForbiddenError, NotFoundError } from '@domain/errors';

import { GetMeUsecase } from '@domain/usecases';

import { TableGenerator } from '@data/protocols';

export class DicesTableGeneratorDecorator implements TableGenerator {
  private readonly getMe: GetMeUsecase;
  private readonly decorated?: TableGenerator;

  public constructor(deps: DicesTableGeneratorDecorator.Deps) {
    this.getMe = deps.getMe;
    this.decorated = deps.decorated;
  }

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'access dices table without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (table) return `${me.currentGame.id}/dices/${table}`;
    return `${me.currentGame.id}/dices`;
  }
}

export namespace DicesTableGeneratorDecorator {
  export type Deps = {
    getMe: GetMeUsecase;
    decorated?: TableGenerator;
  };
}
