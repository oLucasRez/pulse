import { SubjectModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { SubjectHydrator } from '@data/hydration';

import { CreateSubjectUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { SubjectCRUD } from '@data/cruds';

export class CRUDCreateSubjectUsecase implements CreateSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly subjectCRUD: SubjectCRUD;

  public constructor(deps: CRUDCreateSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.subjectCRUD = deps.subjectCRUD;
  }

  public async execute(
    payload: CreateSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description, color } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'create subject' } });

    const subjectDTO = await this.subjectCRUD.create({
      position: position ? position.toJSON() : null,
      description,
      color,
      authorID: myPlayer.id,
      pathIDs: [],
    });

    return SubjectHydrator.hydrate(subjectDTO);
  }
}

export namespace CRUDCreateSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    subjectCRUD: SubjectCRUD;
  };
}
