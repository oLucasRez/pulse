import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  IChangeSubjectUsecase,
  IGetMyPlayerUsecase,
  IGetSubjectUsecase,
} from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { ChangeSubjectObserver } from '@data/observers';

export class ChangeSubjectUsecase implements IChangeSubjectUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly getSubject: IGetSubjectUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly changeSubjectPublisher: ChangeSubjectObserver.Publisher;

  public constructor({
    getMyPlayer,
    getSubject,
    subjectDAO,
    changeSubjectPublisher,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.getSubject = getSubject;
    this.subjectDAO = subjectDAO;
    this.changeSubjectPublisher = changeSubjectPublisher;
  }

  public async execute(
    id: string,
    payload: IChangeSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { description } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    let subject = await this.getSubject.execute(id);

    if (!subject)
      throw new NotFoundError({
        metadata: { entity: 'Subject', prop: 'id', value: id },
      });

    if (subject.authorID !== myPlayer.id)
      throw new ForbiddenError({
        metadata: { tried: 'change subject that is not mine' },
      });

    const dto = await this.subjectDAO.update(id, {
      description,
    });

    subject = SubjectHydrator.hydrate(dto);

    this.changeSubjectPublisher.notifyChangeSubject(subject);

    return subject;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  getSubject: IGetSubjectUsecase;
  subjectDAO: ISubjectDAO;
  changeSubjectPublisher: ChangeSubjectObserver.Publisher;
};
