import { ForbiddenError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import { ICreateSubjectUsecase, IGetMyPlayerUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class CreateSubjectUsecase implements ICreateSubjectUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({ getMyPlayer, subjectDAO, subjectHydrator }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(
    payload: ICreateSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description, color, icon } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new ForbiddenError({ metadata: { tried: 'create subject' } });

    const dto = await this.subjectDAO.create({
      position: position ? position.toJSON() : null,
      description,
      color,
      icon,
      authorID: myPlayer.id,
      pathIDs: [],
    });

    const subject = await this.subjectHydrator.hydrate(dto);

    return subject;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
