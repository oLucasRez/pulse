import { ForbiddenError, NotFoundError } from '@domain/errors';
import { QuestionModel } from '@domain/models';
import {
  ICreateQuestionUsecase,
  IGetCurrentGameUsecase,
  IGetMyPlayerUsecase,
  IGetMySubjectUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

import { IQuestionDAO } from '@data/dao';
import { IQuestionHydrator } from '@data/hydration';

export class CreateQuestionUsecase implements ICreateQuestionUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly getMySubject: IGetMySubjectUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly questionDAO: IQuestionDAO;
  private readonly questionHydrator: IQuestionHydrator;
  public constructor({
    getCurrentGame,
    getMyPlayer,
    getMySubject,
    nextGameState,
    questionDAO,
    questionHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getMyPlayer = getMyPlayer;
    this.getMySubject = getMySubject;
    this.nextGameState = nextGameState;
    this.questionDAO = questionDAO;
    this.questionHydrator = questionHydrator;
  }

  public async execute(
    payload: ICreateQuestionUsecase.Payload,
  ): Promise<QuestionModel> {
    const { description } = payload;

    const currentGame = await this.getCurrentGame.execute();
    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const [state0, state1] = currentGame.state;

    if (state0 !== 'creating:questions' || state1 !== 'create:question')
      throw new ForbiddenError({
        metadata: { tried: 'create question out of time' },
      });

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
      order: myPlayer.order,
      votes: {},
    });

    await this.nextGameState.execute();

    const question = await this.questionHydrator.hydrate(dto);

    return question;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getMyPlayer: IGetMyPlayerUsecase;
  getMySubject: IGetMySubjectUsecase;
  nextGameState: INextGameStateUsecase;
  questionDAO: IQuestionDAO;
  questionHydrator: IQuestionHydrator;
};
