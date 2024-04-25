import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  ICreateMySubjectUsecase,
  ICreateSubjectUsecase,
  IGetCurrentGameUsecase,
  IGetMyPlayerUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';

export class CreateMySubjectUsecase implements ICreateMySubjectUsecase {
  private readonly createSubject: ICreateSubjectUsecase;
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  public constructor({
    createSubject,
    getCurrentGame,
    getMyPlayer,
    nextGameState,
  }: Deps) {
    this.createSubject = createSubject;
    this.getCurrentGame = getCurrentGame;
    this.getMyPlayer = getMyPlayer;
    this.nextGameState = nextGameState;
  }

  public async execute(
    payload: ICreateMySubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { description, icon } = payload;

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (currentGame.state[0] !== 'creating:subjects')
      throw new ForbiddenError({ metadata: { tried: 'create my subject' } });

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'create my subject' } });

    const mySubject = await this.createSubject.execute({
      position: null,
      description,
      icon,
      color: myPlayer.color,
    });

    await this.nextGameState.execute();

    return mySubject;
  }
}

type Deps = {
  createSubject: ICreateSubjectUsecase;
  getCurrentGame: IGetCurrentGameUsecase;
  getMyPlayer: IGetMyPlayerUsecase;
  nextGameState: INextGameStateUsecase;
};
