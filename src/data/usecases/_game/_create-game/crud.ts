import {
  ForbiddenError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';
import { GameModel } from '@domain/models';
import { CreateGameUsecase, GetMeUsecase } from '@domain/usecases';
import { isInteger } from '@domain/utils';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { CreateGameObserver } from '@data/observers';

export class DAOCreateGameUsecase implements CreateGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly createGamePublisher: CreateGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAOCreateGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.createGamePublisher = deps.createGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(payload: CreateGameUsecase.Payload): Promise<GameModel> {
    const { title = null, config } = payload;

    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'create game without session' },
      });

    this.maxPlayersShouldBeValid(config.maxPlayers);

    const dto = await this.gameDAO.create({
      uid: me.uid,
      title,
      config,
      started: false,
      state: 'initial:state',
      roundID: null,
      lightSpotRoundID: null,
    });

    const game = GameHydrator.hydrate(dto);

    this.createGamePublisher.notifyCreateGame(game);

    return game;
  }

  private maxPlayersShouldBeValid(maxPlayers: number): void {
    const prop = 'config.maxPlayers';
    const value = maxPlayers;

    if (maxPlayers < 3)
      throw new OutOfBoundError({
        metadata: { prop, value, bound: 'below', limit: 3 },
      });

    if (maxPlayers > 5)
      throw new OutOfBoundError({
        metadata: { prop, value, bound: 'above', limit: 5 },
      });

    if (!isInteger(maxPlayers))
      throw new NotIntegerError({ metadata: { prop, value } });
  }
}

export namespace DAOCreateGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    createGamePublisher: CreateGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
