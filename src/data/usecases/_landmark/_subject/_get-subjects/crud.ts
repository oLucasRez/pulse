import { SubjectModel } from '@domain/models';
import { GetSubjectsUsecase } from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';

export class DAOGetSubjectsUsecase implements GetSubjectsUsecase {
  private readonly subjectDAO: SubjectDAO;

  public constructor(deps: DAOGetSubjectsUsecase.Deps) {
    this.subjectDAO = deps.subjectDAO;
  }

  public async execute(): Promise<SubjectModel[]> {
    const subjectDTOs = await this.subjectDAO.read();

    return subjectDTOs.map(SubjectHydrator.hydrate);
  }
}

export namespace DAOGetSubjectsUsecase {
  export type Deps = {
    subjectDAO: SubjectDAO;
  };
}
