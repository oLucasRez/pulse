import { ForbiddenError, NotFoundError } from '@domain/errors';

import { GetMeUsecase } from '@domain/usecases';

import { TableGenerator } from '@data/protocols';

export class PlayersTableGeneratorDecorator implements TableGenerator {
  private readonly getMe: GetMeUsecase;
  private readonly decorated?: TableGenerator;

  public constructor(deps: PlayersTableGeneratorDecorator.Deps) {
    this.getMe = deps.getMe;
    this.decorated = deps.decorated;
  }

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'access players table without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (table) return `${me.currentGame.id}/players/${table}`;
    return `${me.currentGame.id}/players`;
  }
}

export namespace PlayersTableGeneratorDecorator {
  export type Deps = {
    getMe: GetMeUsecase;
    decorated?: TableGenerator;
  };
}
