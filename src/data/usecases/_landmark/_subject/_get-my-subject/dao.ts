import { SubjectModel } from '@domain/models';
import { GetMyPlayerUsecase, GetMySubjectUsecase } from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectObserver } from '@data/observers';

export class DAOGetMySubjectUsecase implements GetMySubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly subjectDAO: SubjectDAO;
  private readonly fetchSubjectPublisher: FetchSubjectObserver.Publisher;

  public constructor(deps: DAOGetMySubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.subjectDAO = deps.subjectDAO;
    this.fetchSubjectPublisher = deps.fetchSubjectPublisher;
  }

  public async execute(): Promise<SubjectModel | null> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer?.subjectID) return null;

    const dto = (await this.subjectDAO.read()).find(
      (subject) => subject.id === myPlayer.subjectID,
    );

    const subject = dto ? SubjectHydrator.hydrate(dto) : null;

    this.fetchSubjectPublisher.notifyFetchSubject(myPlayer.subjectID, subject);

    return subject;
  }
}

export namespace DAOGetMySubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    subjectDAO: SubjectDAO;
    fetchSubjectPublisher: FetchSubjectObserver.Publisher;
  };
}
