import { SubjectModel } from '@domain/models';
import { IGetMyPlayerUsecase, IGetMySubjectUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class GetMySubjectUsecase implements IGetMySubjectUsecase {
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({ getMyPlayer, subjectDAO, subjectHydrator }: Deps) {
    this.getMyPlayer = getMyPlayer;
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(): Promise<SubjectModel | null> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer?.subjectID) return null;

    const dto = (await this.subjectDAO.getAll()).find(
      (subject) => subject.id === myPlayer.subjectID,
    );

    const subject = dto ? await this.subjectHydrator.hydrate(dto) : null;

    return subject;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
