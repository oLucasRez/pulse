import { NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  ChangeMySubjectUsecase,
  GetMyPlayerUsecase,
  GetSubjectUsecase,
} from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { ChangeSubjectObserver } from '@data/observers';

export class DAOChangeMySubjectUsecase implements ChangeMySubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly getSubject: GetSubjectUsecase;
  private readonly subjectDAO: SubjectDAO;
  private readonly changeSubjectPublisher: ChangeSubjectObserver.Publisher;

  public constructor(deps: DAOChangeMySubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.getSubject = deps.getSubject;
    this.subjectDAO = deps.subjectDAO;
    this.changeSubjectPublisher = deps.changeSubjectPublisher;
  }

  public async execute(
    payload: ChangeMySubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { position, description } = payload;

    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    if (!myPlayer.subjectID)
      throw new NotFoundError({ metadata: { entity: 'MySubject' } });

    let subject = await this.getSubject.execute(myPlayer.subjectID);

    if (!subject)
      throw new NotFoundError({
        metadata: { entity: 'Subject', prop: 'id', value: myPlayer.subjectID },
      });

    const dto = await this.subjectDAO.update(myPlayer.subjectID, {
      position: position?.toJSON(),
      description,
    });

    subject = SubjectHydrator.hydrate(dto);

    this.changeSubjectPublisher.notifyChangeSubject(subject);

    return subject;
  }
}

export namespace DAOChangeMySubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    getSubject: GetSubjectUsecase;
    subjectDAO: SubjectDAO;
    changeSubjectPublisher: ChangeSubjectObserver.Publisher;
  };
}
