import { SubjectModel } from '@domain/models';
import { IGetMyPlayerUsecase, IGetMySubjectUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectObserver } from '@data/observers';

export class GetMySubjectUsecase implements IGetMySubjectUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly fetchSubjectPublisher: FetchSubjectObserver.Publisher;

  public constructor({ getMyPlayer, subjectDAO, fetchSubjectPublisher }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.subjectDAO = subjectDAO;
    this.fetchSubjectPublisher = fetchSubjectPublisher;
  }

  public async execute(): Promise<SubjectModel | null> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer?.subjectID) return null;

    const dto = (await this.subjectDAO.getAll()).find(
      (subject) => subject.id === myPlayer.subjectID,
    );

    const subject = dto ? SubjectHydrator.hydrate(dto) : null;

    this.fetchSubjectPublisher.notifyFetchSubject(myPlayer.subjectID, subject);

    return subject;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  subjectDAO: ISubjectDAO;
  fetchSubjectPublisher: FetchSubjectObserver.Publisher;
};
