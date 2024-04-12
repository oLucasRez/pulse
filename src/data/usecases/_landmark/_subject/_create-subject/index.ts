import { ForbiddenError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import { ICreateSubjectUsecase, IGetMyPlayerUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { CreateSubjectObserver } from '@data/observers';

export class CreateSubjectUsecase implements ICreateSubjectUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly createSubjectPublisher: CreateSubjectObserver.Publisher;

  public constructor({
    getMyPlayer,
    subjectDAO,
    createSubjectPublisher,
  }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.subjectDAO = subjectDAO;
    this.createSubjectPublisher = createSubjectPublisher;
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

    const subject = SubjectHydrator.hydrate(dto);

    this.createSubjectPublisher.notifyCreateSubject(subject);

    return subject;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  subjectDAO: ISubjectDAO;
  createSubjectPublisher: CreateSubjectObserver.Publisher;
};
