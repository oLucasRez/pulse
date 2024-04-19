import { AnswerModel } from '@domain/models';
import {
  ICreateAnswerUsecase,
  INextGameStateUsecase,
  IStartVotingUsecase,
} from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class CreateAnswerUsecase implements ICreateAnswerUsecase {
  private readonly startVoting: IStartVotingUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({
    startVoting,
    nextGameState,
    answerDAO,
    answerHydrator,
  }: Deps) {
    this.startVoting = startVoting;
    this.nextGameState = nextGameState;
    this.answerDAO = answerDAO;
    this.answerHydrator = answerHydrator;
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

    const answer = await this.answerHydrator.hydrate(dto);

    await this.startVoting.execute(dto.id);

    await this.nextGameState.execute();

    return answer;
  }
}

type Deps = {
  startVoting: IStartVotingUsecase;
  nextGameState: INextGameStateUsecase;
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
