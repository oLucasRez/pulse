import { SubjectModel } from '@domain/models';
import { IGetSubjectUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class GetSubjectUsecase implements IGetSubjectUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({ subjectDAO, subjectHydrator }: Deps) {
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(id: string): Promise<SubjectModel | null> {
    const dto = await this.subjectDAO.getByID(id);

    const subject = dto ? await this.subjectHydrator.hydrate(dto) : null;

    return subject;
  }
}

type Deps = {
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
