import { ForbiddenError, NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import {
  CreateQuestionUsecase,
  GetMyPlayerUsecase,
  GetMySubjectUsecase,
  NextGameStateUsecase,
} from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { QuestionHydrator } from '@data/hydration';
import { CreateQuestionObserver } from '@data/observers';

export class DAOCreateQuestionUsecase implements CreateQuestionUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly getMySubject: GetMySubjectUsecase;
  private readonly nextGameState: NextGameStateUsecase;
  private readonly questionDAO: IQuestionDAO;
  private readonly createQuestionPublisher: CreateQuestionObserver.Publisher;

  public constructor({
    getMyPlayer,
    getMySubject,
    nextGameState,
    questionDAO,
    createQuestionPublisher,
  }: DAOCreateQuestionUsecase.Deps) {
    this.getMyPlayer = getMyPlayer;
    this.getMySubject = getMySubject;
    this.nextGameState = nextGameState;
    this.questionDAO = questionDAO;
    this.createQuestionPublisher = createQuestionPublisher;
  }

  public async execute(
    payload: CreateQuestionUsecase.Payload,
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
      position: mySubject.position,
      description,
      subjectIDs,
      authorID: myPlayer.id,
      factID: null,
    });

    await this.nextGameState.execute();

    const question = QuestionHydrator.hydrate(dto);

    this.createQuestionPublisher.notifyCreateQuestion(question);

    return question;
  }
}

export namespace DAOCreateQuestionUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    getMySubject: GetMySubjectUsecase;
    nextGameState: NextGameStateUsecase;
    questionDAO: IQuestionDAO;
    createQuestionPublisher: CreateQuestionObserver.Publisher;
  };
}
