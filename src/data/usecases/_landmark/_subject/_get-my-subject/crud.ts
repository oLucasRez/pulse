import { SubjectModel } from '@domain/models';
import { GetMyPlayerUsecase, GetMySubjectUsecase } from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';

export class DAOGetMySubjectUsecase implements GetMySubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly subjectDAO: SubjectDAO;

  public constructor(deps: DAOGetMySubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.subjectDAO = deps.subjectDAO;
  }

  public async execute(): Promise<SubjectModel | null> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer?.subjectID) return null;

    const subjectDTO = (await this.subjectDAO.read()).find(
      (subject) => subject.id === myPlayer.subjectID,
    );

    return subjectDTO ? SubjectHydrator.hydrate(subjectDTO) : null;
  }
}

export namespace DAOGetMySubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    subjectDAO: SubjectDAO;
  };
}
