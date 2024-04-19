import { SubjectPulseModel } from '@domain/models';
import { IGetSubjectPulseUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { ISubjectPulseHydrator } from '@data/hydration';

export class GetSubjectPulseUsecase implements IGetSubjectPulseUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly subjectPulseHydrator: ISubjectPulseHydrator;
  public constructor({ subjectPulseDAO, subjectPulseHydrator }: Deps) {
    this.subjectPulseDAO = subjectPulseDAO;
    this.subjectPulseHydrator = subjectPulseHydrator;
  }

  public async execute(id: string): Promise<SubjectPulseModel | null> {
    const dto = await this.subjectPulseDAO.getByID(id);

    const subjectPulse = dto
      ? await this.subjectPulseHydrator.hydrate(dto)
      : null;

    return subjectPulse;
  }
}

type Deps = {
  subjectPulseDAO: ISubjectPulseDAO;
  subjectPulseHydrator: ISubjectPulseHydrator;
};
