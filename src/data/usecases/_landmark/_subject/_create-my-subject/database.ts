import { SubjectModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import {
  CreateMySubjectUsecase,
  CreateSubjectUsecase,
  GetMyPlayerUsecase,
  SetPlayerSubjectUsecase,
} from '@domain/usecases';

export class DatabaseCreateMySubjectUsecase implements CreateMySubjectUsecase {
  private readonly createSubject: CreateSubjectUsecase;
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly setPlayerSubject: SetPlayerSubjectUsecase;

  public constructor(deps: DatabaseCreateMySubjectUsecase.Deps) {
    this.createSubject = deps.createSubject;
    this.getMyPlayer = deps.getMyPlayer;
    this.setPlayerSubject = deps.setPlayerSubject;
  }

  public async execute(
    payload: CreateMySubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { description } = payload;

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

export namespace DatabaseCreateMySubjectUsecase {
  export type Deps = {
    createSubject: CreateSubjectUsecase;
    getMyPlayer: GetMyPlayerUsecase;
    setPlayerSubject: SetPlayerSubjectUsecase;
  };
}
