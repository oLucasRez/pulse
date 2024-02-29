import { SubjectModel } from '@domain/models';

import { FailedError, ForbiddenError, NotFoundError } from '@domain/errors';

import {
  CreateMySubjectUsecase,
  CreateSubjectUsecase,
  GetMeUsecase,
  GetMyPlayerUsecase,
  SetPlayerSubjectUsecase,
} from '@domain/usecases';

export class CRUDCreateMySubjectUsecase implements CreateMySubjectUsecase {
  private readonly createSubject: CreateSubjectUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly setPlayerSubject: SetPlayerSubjectUsecase;

  public constructor(deps: CRUDCreateMySubjectUsecase.Deps) {
    this.createSubject = deps.createSubject;
    this.getMe = deps.getMe;
    this.getMyPlayer = deps.getMyPlayer;
    this.setPlayerSubject = deps.setPlayerSubject;
  }

  public async execute(
    payload: CreateMySubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { description } = payload;

    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'create my subject without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (me.currentGame.state !== 'creating:subjects')
      throw new ForbiddenError({ metadata: { tried: 'create my subject' } });

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'create my subject' } });

    try {
      const mySubject = await this.createSubject.execute({
        position: null,
        description,
        color: myPlayer.color,
      });

      await this.setPlayerSubject.execute(mySubject.id);

      return mySubject;
    } catch {
      throw new FailedError({ metadata: { tried: 'create my subject' } });
    }
  }
}

export namespace CRUDCreateMySubjectUsecase {
  export type Deps = {
    createSubject: CreateSubjectUsecase;
    getMe: GetMeUsecase;
    getMyPlayer: GetMyPlayerUsecase;
    setPlayerSubject: SetPlayerSubjectUsecase;
  };
}
