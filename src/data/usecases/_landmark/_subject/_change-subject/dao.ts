import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  ChangeSubjectUsecase,
  GetMyPlayerUsecase,
  GetSubjectUsecase,
} from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { ChangeSubjectObserver } from '@data/observers';

export class DAOChangeSubjectUsecase implements ChangeSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly getSubject: GetSubjectUsecase;
  private readonly subjectDAO: SubjectDAO;
  private readonly changeSubjectPublisher: ChangeSubjectObserver.Publisher;

  public constructor(deps: DAOChangeSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.getSubject = deps.getSubject;
    this.subjectDAO = deps.subjectDAO;
    this.changeSubjectPublisher = deps.changeSubjectPublisher;
  }

  public async execute(
    id: string,
    payload: ChangeSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description } = payload;

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
      position: position.toJSON(),
      description,
    });

    subject = SubjectHydrator.hydrate(dto);

    this.changeSubjectPublisher.notifyChangeSubject(subject);

    return subject;
  }
}

export namespace DAOChangeSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    getSubject: GetSubjectUsecase;
    subjectDAO: SubjectDAO;
    changeSubjectPublisher: ChangeSubjectObserver.Publisher;
  };
}
