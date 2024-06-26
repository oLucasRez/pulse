import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  IEditSubjectUsecase,
  IGetMyPlayerUsecase,
  IGetSubjectUsecase,
} from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class EditSubjectUsecase implements IEditSubjectUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly getSubject: IGetSubjectUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({
    getMyPlayer,
    getSubject,
    subjectDAO,
    subjectHydrator,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.getSubject = getSubject;
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(
    id: string,
    payload: IEditSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { icon, description, color } = payload;

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

    const dto = await this.subjectDAO.update(id, {
      icon,
      description,
      color,
    });

    return this.subjectHydrator.hydrate(dto);
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  getSubject: IGetSubjectUsecase;
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
