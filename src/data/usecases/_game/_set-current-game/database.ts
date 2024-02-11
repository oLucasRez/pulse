import { FailedError, NotFoundError } from '@domain/errors';

import {
  ChangeUserUsecase,
  GetGameUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

import { CacheProtocol } from '@data/protocols';

export class CacheSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getGame: GetGameUsecase;
  private readonly changeUser: ChangeUserUsecase;
  private readonly cache: CacheProtocol;

  public constructor(deps: CacheSetCurrentGameUsecase.Deps) {
    this.getGame = deps.getGame;
    this.changeUser = deps.changeUser;
    this.cache = deps.cache;
  }

  public async execute(id: string): Promise<void> {
    const game = await this.getGame.execute(id);

    await this.cache.set<string>('currentGameID', game.id);

    try {
      await this.changeUser.execute({ currentGameID: game.id });
    } catch (e) {
      if (e instanceof FailedError) await this.cache.remove('currentGameID');
      if (e instanceof NotFoundError) return;

      throw e;
    }
  }
}

export namespace CacheSetCurrentGameUsecase {
  export type Deps = {
    getGame: GetGameUsecase;
    changeUser: ChangeUserUsecase;
    cache: CacheProtocol;
  };
}
