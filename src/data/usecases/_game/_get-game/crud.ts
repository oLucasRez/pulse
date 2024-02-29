import { GameModel } from '@domain/models';

import { GameHydrator } from '@data/hydration';

import { GetGameUsecase } from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class CRUDGetGameUsecase implements GetGameUsecase {
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDGetGameUsecase.Deps) {
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(id: string): Promise<GameModel | null> {
    const gameDTO = await this.gameCRUD.read(id);

    return gameDTO ? GameHydrator.hydrate(gameDTO) : null;
  }
}

export namespace CRUDGetGameUsecase {
  export type Deps = {
    gameCRUD: GameCRUD;
  };
}
