import { ForbiddenError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import { CreateSubjectUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { CreateSubjectObserver } from '@data/observers';

export class DAOCreateSubjectUsecase implements CreateSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly createSubjectPublisher: CreateSubjectObserver.Publisher;

  public constructor(deps: DAOCreateSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.subjectDAO = deps.subjectDAO;
    this.createSubjectPublisher = deps.createSubjectPublisher;
  }

  public async execute(
    payload: CreateSubjectUsecase.Payload,
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

    const subject = SubjectHydrator.hydrate(dto);

    this.createSubjectPublisher.notifyCreateSubject(subject);

    return subject;
  }
}

export namespace DAOCreateSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    subjectDAO: ISubjectDAO;
    createSubjectPublisher: CreateSubjectObserver.Publisher;
  };
}
