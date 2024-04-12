import {
  ForbiddenError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';
import { GameModel } from '@domain/models';
import { ICreateGameUsecase, IGetMeUsecase } from '@domain/usecases';
import { isInteger } from '@domain/utils';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { CreateGameObserver } from '@data/observers';

export class CreateGameUsecase implements ICreateGameUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly createGamePublisher: CreateGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor({ getMe, createGamePublisher, gameDAO }: Deps) {
    this.getMe = getMe;
    this.createGamePublisher = createGamePublisher;
    this.gameDAO = gameDAO;
  }

  public async execute(
    payload: ICreateGameUsecase.Payload,
  ): Promise<GameModel> {
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
      state: ['initial:state'],
      voting: null,
      centralPulseID: null,
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

type Deps = {
  getMe: IGetMeUsecase;
  createGamePublisher: CreateGameObserver.Publisher;
  gameDAO: IGameDAO;
};
