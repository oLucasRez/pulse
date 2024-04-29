import { NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import {
  IGetAnswersUsecase,
  IGetMyPlayerUsecase,
  IGetPlayersUsecase,
  INextGameStateUsecase,
  IVoteQuestionFactUsecase,
} from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class VoteQuestionFactUsecase implements IVoteQuestionFactUsecase {
  private readonly getAnswers: IGetAnswersUsecase;
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({
    getAnswers,
    getMyPlayer,
    getPlayers,
    nextGameState,
    questionDAO,
    questionHydrator,
  }: Deps) {
    this.getAnswers = getAnswers;
    this.getMyPlayer = getMyPlayer;
    this.getPlayers = getPlayers;
    this.nextGameState = nextGameState;
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(
    id: string,
    answerID: string | null,
  ): Promise<QuestionModel> {
    const myPlayer = await this.getMyPlayer.execute();
    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    let dto = await this.questionDAO.getByID(id);

    const players = await this.getPlayers.execute();

    const answers = await this.getAnswers.execute();
    const lastAnswer = answers.sort(
      (answer1, answer2) =>
        answer2.createdAt.getTime() - answer1.createdAt.getTime(),
    )[0];
    if (!lastAnswer)
      throw new NotFoundError({ metadata: { entity: 'LastAnswer' } });

    const votingWasExpired = players.some(
      ({ id }) => !dto?.votes[id]?.upToDate,
    );

    dto = await this.questionDAO.update(id, {
      votes: { [myPlayer.id]: { answerID, upToDate: true } },
    });

    const votingNowIsUpToDate = players.every(
      ({ id }) => dto?.votes[id]?.upToDate,
    );

    if (votingWasExpired && votingNowIsUpToDate)
      await this.nextGameState.execute();

    return this.questionHydrator.hydrate(dto);
  }
}

type Deps = {
  getAnswers: IGetAnswersUsecase;
  getMyPlayer: IGetMyPlayerUsecase;
  getPlayers: IGetPlayersUsecase;
  nextGameState: INextGameStateUsecase;
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
