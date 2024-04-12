import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  CreateMySubjectUsecase,
  CreateSubjectUsecase,
  GetCurrentGameUsecase,
  GetMyPlayerUsecase,
  NextGameStateUsecase,
  SetPlayerSubjectUsecase,
} from '@domain/usecases';

import { CreateSubjectObserver } from '@data/observers';

export class DAOCreateMySubjectUsecase implements CreateMySubjectUsecase {
  private readonly createSubject: CreateSubjectUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly nextGameState: NextGameStateUsecase;
  private readonly setPlayerSubject: SetPlayerSubjectUsecase;
  private readonly createSubjectPublisher: CreateSubjectObserver.Publisher;

  public constructor({
    createSubject,
    getCurrentGame,
    getMyPlayer,
    nextGameState,
    setPlayerSubject,
    createSubjectPublisher,
  }: DAOCreateMySubjectUsecase.Deps) {
    this.createSubject = createSubject;
    this.getCurrentGame = getCurrentGame;
    this.getMyPlayer = getMyPlayer;
    this.nextGameState = nextGameState;
    this.setPlayerSubject = setPlayerSubject;
    this.createSubjectPublisher = createSubjectPublisher;
  }

  public async execute(
    payload: CreateMySubjectUsecase.Payload,
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

    await this.setPlayerSubject.execute(mySubject.id);

    await this.nextGameState.execute();

    this.createSubjectPublisher.notifyCreateSubject(mySubject);

    return mySubject;
  }
}

export namespace DAOCreateMySubjectUsecase {
  export type Deps = {
    createSubject: CreateSubjectUsecase;
    getCurrentGame: GetCurrentGameUsecase;
    getMyPlayer: GetMyPlayerUsecase;
    nextGameState: NextGameStateUsecase;
    setPlayerSubject: SetPlayerSubjectUsecase;
    createSubjectPublisher: CreateSubjectObserver.Publisher;
  };
}
