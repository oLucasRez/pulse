import { ForbiddenError, NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import {
  ICreateQuestionUsecase,
  IGetMyPlayerUsecase,
  IGetMySubjectUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class CreateQuestionUsecase implements ICreateQuestionUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly getMySubject: IGetMySubjectUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({
    getMyPlayer,
    getMySubject,
    nextGameState,
    questionDAO,
    questionHydrator,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.getMySubject = getMySubject;
    this.nextGameState = nextGameState;
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(
    payload: ICreateQuestionUsecase.Payload,
  ): Promise<QuestionModel> {
    const { description, subjectIDs } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const mySubject = await this.getMySubject.execute();

    if (!mySubject)
      throw new NotFoundError({ metadata: { entity: 'MySubject' } });
    if (!mySubject.position)
      throw new ForbiddenError({
        metadata: { tried: 'create question without subject positioned' },
      });

    const dto = await this.questionDAO.create({
      position: mySubject.position.toJSON(),
      description,
      color: null,
      subjectIDs,
      authorID: myPlayer.id,
    });

    await this.nextGameState.execute();

    const question = await this.questionHydrator.hydrate(dto);

    return question;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  getMySubject: IGetMySubjectUsecase;
  nextGameState: INextGameStateUsecase;
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
