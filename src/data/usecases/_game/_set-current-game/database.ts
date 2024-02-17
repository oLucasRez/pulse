import {
  ChangeMeUsecase,
  GetGameUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

export class CacheSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getGame: GetGameUsecase;
  private readonly changeMe: ChangeMeUsecase;

  public constructor(deps: CacheSetCurrentGameUsecase.Deps) {
    this.getGame = deps.getGame;
    this.changeMe = deps.changeMe;
  }

  public async execute(id: string): Promise<void> {
    const game = await this.getGame.execute(id);

    await this.changeMe.execute({ currentGameID: game.id });
  }
}

export namespace CacheSetCurrentGameUsecase {
  export type Deps = {
    getGame: GetGameUsecase;
    changeMe: ChangeMeUsecase;
  };
}
