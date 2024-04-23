import { NotFoundError } from '@domain/errors';
import { AnswerModel } from '@domain/models';
import {
  ICreateAnswerUsecase,
  IGetMyPlayerUsecase,
  INextGameStateUsecase,
  ISetVotingAnswerUsecase,
} from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { IAnswerHydrator } from '@data/hydration';

export class CreateAnswerUsecase implements ICreateAnswerUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly setVotingAnswer: ISetVotingAnswerUsecase;
  private readonly answerDAO: IAnswerDAO;
  private readonly answerHydrator: IAnswerHydrator;
  public constructor({
    getMyPlayer,
    nextGameState,
    setVotingAnswer,
    answerDAO,
    answerHydrator,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.nextGameState = nextGameState;
    this.setVotingAnswer = setVotingAnswer;
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
      votes: { [myPlayer.id]: true },
    });

    await this.setVotingAnswer.execute(dto.id);

    await this.nextGameState.execute();

    return this.answerHydrator.hydrate(dto);
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  nextGameState: INextGameStateUsecase;
  setVotingAnswer: ISetVotingAnswerUsecase;
  answerDAO: IAnswerDAO;
  answerHydrator: IAnswerHydrator;
};
