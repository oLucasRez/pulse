import { ForbiddenError, NotFoundError } from '@domain/errors';
import {
  GetCurrentGameUsecase,
  GetPlayersUsecase,
  IGetAnswerUsecase,
  ISetQuestionFactUsecase,
  IVoteUsecase,
  NextGameStateUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { ChangeGameObserver } from '@data/observers';

export class VoteUsecase implements IVoteUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly getAnswer: IGetAnswerUsecase;
  private readonly setQuestionFact: ISetQuestionFactUsecase;
  private readonly nextGameState: NextGameStateUsecase;
  private readonly changeGamePublisher: ChangeGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor({
    getCurrentGame,
    getPlayers,
    getAnswer,
    setQuestionFact,
    nextGameState,
    changeGamePublisher,
    gameDAO,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getPlayers = getPlayers;
    this.getAnswer = getAnswer;
    this.setQuestionFact = setQuestionFact;
    this.nextGameState = nextGameState;
    this.changeGamePublisher = changeGamePublisher;
    this.gameDAO = gameDAO;
  }

  public async execute(playerID: string, value: boolean): Promise<void> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (!currentGame.voting)
      throw new ForbiddenError({
        metadata: { tried: 'vote without a started voting' },
      });

    const votes = { ...currentGame.voting.votes, [playerID]: value };

    const players = await this.getPlayers.execute();

    const answer = await this.getAnswer.execute(currentGame.voting.answerID);

    const finished = players.every((player) => {
      if (!currentGame.voting) return false;
      if (!answer) return false;

      const isAuthor = answer.authorID === player.id;

      return isAuthor || player.id in currentGame.voting.votes;
    });

    const mustBeFact = finished && value;

    if (mustBeFact)
      await this.setQuestionFact.execute(currentGame.voting.answerID);

    if (finished) await this.nextGameState.execute();
    else {
      const dto = await this.gameDAO.update(currentGame.id, {
        voting: { votes },
      });

      const game = GameHydrator.hydrate(dto);

      this.changeGamePublisher.notifyChangeGame(game);
    }
  }
}

type Deps = {
  getCurrentGame: GetCurrentGameUsecase;
  getPlayers: GetPlayersUsecase;
  getAnswer: IGetAnswerUsecase;
  setQuestionFact: ISetQuestionFactUsecase;
  nextGameState: NextGameStateUsecase;
  changeGamePublisher: ChangeGameObserver.Publisher;
  gameDAO: IGameDAO;
};
