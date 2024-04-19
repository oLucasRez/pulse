import { ForbiddenError, NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  IGetPlayersUsecase,
  INextGameStateUsecase,
  ISetQuestionFactUsecase,
  IVoteUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class VoteUsecase implements IVoteUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly setQuestionFact: ISetQuestionFactUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({
    getCurrentGame,
    getPlayers,
    setQuestionFact,
    nextGameState,
    gameDAO,
    gameHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getPlayers = getPlayers;
    this.setQuestionFact = setQuestionFact;
    this.nextGameState = nextGameState;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(playerID: string, value: boolean): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (!currentGame.voting)
      throw new ForbiddenError({
        metadata: { tried: 'vote without a started voting' },
      });

    const votes = { ...currentGame.voting.votes, [playerID]: value };

    const players = await this.getPlayers.execute();

    const finished = players.every((player) => {
      if (!currentGame.voting) return false;

      return player.id in currentGame.voting.votes;
    });

    const mustBeFact = finished && value;

    if (mustBeFact)
      await this.setQuestionFact.execute(currentGame.voting.answerID);

    if (finished) {
      await this.nextGameState.execute();

      return currentGame;
    } else {
      const dto = await this.gameDAO.update(currentGame.id, {
        voting: { votes },
      });

      const game = await this.gameHydrator.hydrate(dto);

      return game;
    }
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getPlayers: IGetPlayersUsecase;
  setQuestionFact: ISetQuestionFactUsecase;
  nextGameState: INextGameStateUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};
