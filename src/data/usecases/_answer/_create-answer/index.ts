import { NotFoundError } from '@domain/errors';
import { AnswerModel } from '@domain/models';
import {
  ICreateAnswerUsecase,
  IExpireQuestionVotesUsecase,
  IGetMyPlayerUsecase,
  INextGameStateUsecase,
  IVoteQuestionFactUsecase,
} from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class CreateAnswerUsecase implements ICreateAnswerUsecase {
  private readonly expireQuestionVotes: IExpireQuestionVotesUsecase;
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly voteQuestionFact: IVoteQuestionFactUsecase;
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({
    expireQuestionVotes,
    getMyPlayer,
    nextGameState,
    voteQuestionFact,
    answerDAO,
    answerHydrator,
  }: Deps) {
    this.expireQuestionVotes = expireQuestionVotes;
    this.getMyPlayer = getMyPlayer;
    this.nextGameState = nextGameState;
    this.voteQuestionFact = voteQuestionFact;
    this.answerDAO = answerDAO;
    this.answerHydrator = answerHydrator;
  }

  public async execute(
    payload: ICreateAnswerUsecase.Payload,
  ): Promise<AnswerModel> {
    const { description, questionID } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const dto = await this.answerDAO.create({
      description,
      questionID,
      authorID: myPlayer.id,
    });

    await this.expireQuestionVotes.execute(questionID);

    await this.voteQuestionFact.execute(questionID, dto.id);

    await this.nextGameState.execute();

    return this.answerHydrator.hydrate(dto);
  }
}

type Deps = {
  expireQuestionVotes: IExpireQuestionVotesUsecase;
  getMyPlayer: IGetMyPlayerUsecase;
  nextGameState: INextGameStateUsecase;
  voteQuestionFact: IVoteQuestionFactUsecase;
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
