import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import { IChangeGameUsecase, IGetCurrentGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class ChangeGameUsecase implements IChangeGameUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({ getCurrentGame, gameDAO, gameHydrator }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(
    payload: IChangeGameUsecase.Payload,
  ): Promise<GameModel> {
    const { title, config } = payload;

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const dto = await this.gameDAO.update(currentGame.id, {
      title,
      config,
    });

    const game = await this.gameHydrator.hydrate(dto);

    return game;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
