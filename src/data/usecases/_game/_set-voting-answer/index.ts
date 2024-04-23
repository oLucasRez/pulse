import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  ISetVotingAnswerUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class SetVotingAnswerUsecase implements ISetVotingAnswerUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({ getCurrentGame, gameDAO, gameHydrator }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(answerID: string): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const dto = await this.gameDAO.update(currentGame.id, {
      votingAnswerID: answerID,
    });

    return this.gameHydrator.hydrate(dto);
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
