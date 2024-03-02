import { GameModel } from '@domain/models';

import { GameHydrator } from '@data/hydration';

import { GetCurrentGameUsecase, GetMeUsecase } from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class CRUDGetCurrentGameUsecase implements GetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDGetCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();

    if (!me?.currentGameID) return null;

    const gameDTO = await this.gameCRUD.read(me.currentGameID);

    return gameDTO ? GameHydrator.hydrate(gameDTO) : null;
  }
}

export namespace CRUDGetCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    gameCRUD: GameCRUD;
  };
}
