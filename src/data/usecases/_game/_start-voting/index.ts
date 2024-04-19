import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  IGetCurrentPlayerUsecase,
  IStartVotingUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class StartVotingUsecase implements IStartVotingUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getCurrentPlayer: IGetCurrentPlayerUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({
    getCurrentGame,
    getCurrentPlayer,
    gameDAO,
    gameHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getCurrentPlayer = getCurrentPlayer;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(answerID: string): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });
    if (!currentGame.roundID)
      throw new NotFoundError({ metadata: { entity: 'Round' } });

    const currentPlayer = await this.getCurrentPlayer.execute(
      currentGame.roundID,
    );

    if (!currentPlayer)
      throw new NotFoundError({ metadata: { entity: 'CurrentPlayer' } });

    const dto = await this.gameDAO.update(currentGame.id, {
      voting: {
        answerID,
        votes: { [currentPlayer.id]: true },
      },
    });

    const game = await this.gameHydrator.hydrate(dto);

    return game;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getCurrentPlayer: IGetCurrentPlayerUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
