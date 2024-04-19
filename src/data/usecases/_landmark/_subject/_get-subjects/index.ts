import { SubjectModel } from '@domain/models';
import { IGetSubjectsUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class GetSubjectsUsecase implements IGetSubjectsUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({ subjectDAO, subjectHydrator }: Deps) {
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(): Promise<SubjectModel[]> {
    const dtos = await this.subjectDAO.getAll();

    const subjects = await Promise.all(
      dtos.map((dto) => this.subjectHydrator.hydrate(dto)),
    );

    return subjects;
  }
}

type Deps = {
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
