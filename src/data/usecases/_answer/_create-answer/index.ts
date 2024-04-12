import { AnswerModel } from '@domain/models';
import {
  ICreateAnswerUsecase,
  IStartVotingUsecase,
  NextGameStateUsecase,
} from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { AnswerHydrator } from '@data/hydration';
import { CreateAnswerObserver } from '@data/observers';

export class CreateAnswerUsecase implements ICreateAnswerUsecase {
  private readonly startVoting: IStartVotingUsecase;
  private readonly nextGameState: NextGameStateUsecase;
  private readonly answerDAO: IAnswerDAO;
  private readonly createAnswerPublisher: CreateAnswerObserver.Publisher;

  public constructor({
    startVoting,
    nextGameState,
    answerDAO,
    createAnswerPublisher,
  }: Deps) {
    this.startVoting = startVoting;
    this.nextGameState = nextGameState;
    this.answerDAO = answerDAO;
    this.createAnswerPublisher = createAnswerPublisher;
  }

  public async execute(
    payload: ICreateAnswerUsecase.Payload,
  ): Promise<AnswerModel> {
    const { description, questionID, authorID } = payload;

    const dto = await this.answerDAO.create({
      description,
      questionID,
      authorID,
    });

    const answer = AnswerHydrator.hydrate(dto);

    this.createAnswerPublisher.notifyCreateAnswer(answer);

    await this.nextGameState.execute();

    await this.startVoting.execute(dto.id);

    return answer;
  }
}

type Deps = {
  startVoting: IStartVotingUsecase;
  nextGameState: NextGameStateUsecase;
  answerDAO: IAnswerDAO;
  createAnswerPublisher: CreateAnswerObserver.Publisher;
};
