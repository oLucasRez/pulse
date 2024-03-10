import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import { ChangeGameUsecase, GetCurrentGameUsecase } from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { ChangeGameObserver } from '@data/observers';

export class DAOChangeGameUsecase implements ChangeGameUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly changeGamePublisher: ChangeGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAOChangeGameUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.changeGamePublisher = deps.changeGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(payload: ChangeGameUsecase.Payload): Promise<GameModel> {
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

export namespace DAOChangeGameUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    changeGamePublisher: ChangeGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
