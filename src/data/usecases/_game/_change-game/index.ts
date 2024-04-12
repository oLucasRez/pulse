import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import { IChangeGameUsecase, IGetCurrentGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { ChangeGameObserver } from '@data/observers';

export class ChangeGameUsecase implements IChangeGameUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly changeGamePublisher: ChangeGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor({ getCurrentGame, changeGamePublisher, gameDAO }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.changeGamePublisher = changeGamePublisher;
    this.gameDAO = gameDAO;
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

    const game = GameHydrator.hydrate(dto);

    this.changeGamePublisher.notifyChangeGame(game);

    return game;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  changeGamePublisher: ChangeGameObserver.Publisher;
  gameDAO: IGameDAO;
};
