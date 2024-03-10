import { ForbiddenError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import { CreateSubjectUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';

export class DAOCreateSubjectUsecase implements CreateSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly subjectDAO: SubjectDAO;

  public constructor(deps: DAOCreateSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.subjectDAO = deps.subjectDAO;
  }

  public async execute(
    payload: CreateSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description, color } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'create subject' } });

    const subjectDTO = await this.subjectDAO.create({
      position: position ? position.toJSON() : null,
      description,
      color,
      authorID: myPlayer.id,
      pathIDs: [],
    });

    return SubjectHydrator.hydrate(subjectDTO);
  }
}

export namespace DAOCreateSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    subjectDAO: SubjectDAO;
  };
}
