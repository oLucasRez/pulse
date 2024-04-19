import { GameModel } from '@domain/models';
import { IGetGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class GetGameUsecase implements IGetGameUsecase {
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({ gameDAO, gameHydrator }: Deps) {
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(id: string): Promise<GameModel | null> {
    const dto = await this.gameDAO.getByID(id);

    const game = dto ? await this.gameHydrator.hydrate(dto) : null;

    return game;
  }
}

type Deps = {
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
