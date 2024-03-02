import { SubjectModel } from '@domain/models';

import { ForbiddenError, NotFoundError } from '@domain/errors';

import { SubjectHydrator } from '@data/hydration';

import {
  ChangeSubjectUsecase,
  GetMyPlayerUsecase,
  GetSubjectUsecase,
} from '@domain/usecases';

import { SubjectCRUD } from '@data/cruds';

export class CRUDChangeSubjectUsecase implements ChangeSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly getSubject: GetSubjectUsecase;
  private readonly subjectCRUD: SubjectCRUD;

  public constructor(deps: CRUDChangeSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.getSubject = deps.getSubject;
    this.subjectCRUD = deps.subjectCRUD;
  }

  public async execute(
    id: string,
    payload: ChangeSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const subject = await this.getSubject.execute(id);

    if (!subject)
      throw new NotFoundError({
        metadata: { entity: 'Subject', prop: 'id', value: id },
      });

    if (subject.authorID !== myPlayer.id)
      throw new ForbiddenError({
        metadata: { tried: 'change subject that is not mine' },
      });

    const subjectDTO = await this.subjectCRUD.update(id, {
      position: position.toJSON(),
      description,
    });

    return SubjectHydrator.hydrate(subjectDTO);
  }
}

export namespace CRUDChangeSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    getSubject: GetSubjectUsecase;
    subjectCRUD: SubjectCRUD;
  };
}
