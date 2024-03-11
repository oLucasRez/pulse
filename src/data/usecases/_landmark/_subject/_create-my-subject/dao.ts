import { FailedError, ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  CreateMySubjectUsecase,
  CreateSubjectUsecase,
  GetCurrentGameUsecase,
  GetMyPlayerUsecase,
  SetPlayerSubjectUsecase,
} from '@domain/usecases';

import { CreateSubjectObserver } from '@data/observers';

export class DAOCreateMySubjectUsecase implements CreateMySubjectUsecase {
  private readonly createSubject: CreateSubjectUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly setPlayerSubject: SetPlayerSubjectUsecase;
  private readonly createSubjectPublisher: CreateSubjectObserver.Publisher;

  public constructor(deps: DAOCreateMySubjectUsecase.Deps) {
    this.createSubject = deps.createSubject;
    this.getCurrentGame = deps.getCurrentGame;
    this.getMyPlayer = deps.getMyPlayer;
    this.setPlayerSubject = deps.setPlayerSubject;
    this.createSubjectPublisher = deps.createSubjectPublisher;
  }

  public async execute(
    payload: CreateMySubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { description, icon } = payload;

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (currentGame.state !== 'creating:subjects')
      throw new ForbiddenError({ metadata: { tried: 'create my subject' } });

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'create my subject' } });

    try {
      const mySubject = await this.createSubject.execute({
        position: null,
        description,
        icon,
        color: myPlayer.color,
      });

      await this.setPlayerSubject.execute(mySubject.id);

      this.createSubjectPublisher.notifyCreateSubject(mySubject);

      return mySubject;
    } catch {
      throw new FailedError({ metadata: { tried: 'create my subject' } });
    }
  }
}

export namespace DAOCreateMySubjectUsecase {
  export type Deps = {
    createSubject: CreateSubjectUsecase;
    getCurrentGame: GetCurrentGameUsecase;
    getMyPlayer: GetMyPlayerUsecase;
    setPlayerSubject: SetPlayerSubjectUsecase;
    createSubjectPublisher: CreateSubjectObserver.Publisher;
  };
}
