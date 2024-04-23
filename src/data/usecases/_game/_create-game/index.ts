import {
  ForbiddenError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';
import { GameModel } from '@domain/models';
import { ICreateGameUsecase, IGetMeUsecase } from '@domain/usecases';
import { isInteger } from '@domain/utils';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class CreateGameUsecase implements ICreateGameUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({ getMe, gameDAO, gameHydrator }: Deps) {
    this.getMe = getMe;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
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
      centralPulseID: null,
      roundID: null,
      lightSpotRoundID: null,
      votingAnswerID: null,
    });

    const game = await this.gameHydrator.hydrate(dto);

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
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
