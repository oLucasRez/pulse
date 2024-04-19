import { SubjectPulseModel } from '@domain/models';
import { IGetSubjectPulsesUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { ISubjectPulseHydrator } from '@data/hydration';

export class GetSubjectPulsesUsecase implements IGetSubjectPulsesUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly subjectPulseHydrator: ISubjectPulseHydrator;
  public constructor({ subjectPulseDAO, subjectPulseHydrator }: Deps) {
    this.subjectPulseDAO = subjectPulseDAO;
    this.subjectPulseHydrator = subjectPulseHydrator;
  }

  public async execute(): Promise<SubjectPulseModel[]> {
    const dtos = await this.subjectPulseDAO.getAll();

    const subjectPulses = await Promise.all(
      dtos.map((dto) => this.subjectPulseHydrator.hydrate(dto)),
    );

    return subjectPulses;
  }
}

type Deps = {
  subjectPulseDAO: ISubjectPulseDAO;
  subjectPulseHydrator: ISubjectPulseHydrator;
};
