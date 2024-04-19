import { ForbiddenError, NotFoundError } from '@domain/errors';
import { IDeleteGameUsecase, IGetGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { SessionGetterProtocol } from '@data/protocols';

export class DeleteGameUsecase implements IDeleteGameUsecase {
  private readonly sessionGetter: SessionGetterProtocol;
  private readonly getGame: IGetGameUsecase;
  private readonly gameDAO: IGameDAO;
  public constructor({ sessionGetter, getGame, gameDAO }: Deps) {
    this.sessionGetter = sessionGetter;
    this.getGame = getGame;
    this.gameDAO = gameDAO;
  }

  public async execute(id: string): Promise<void> {
    const { uid } = await this.sessionGetter.getSession();

    const game = await this.getGame.execute(id);

    if (!game)
      throw new NotFoundError({
        metadata: { entity: 'Game', prop: 'id', value: id },
      });

    if (game.uid !== uid)
      throw new ForbiddenError({
        metadata: { tried: 'delete a game of another user' },
      });

    await this.gameDAO.delete(id);
  }
}

type Deps = {
  sessionGetter: SessionGetterProtocol;
  getGame: IGetGameUsecase;
  gameDAO: IGameDAO;
};
