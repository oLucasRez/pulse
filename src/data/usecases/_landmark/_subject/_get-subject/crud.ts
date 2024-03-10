import { SubjectModel } from '@domain/models';
import { GetSubjectUsecase } from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';

export class DAOGetSubjectUsecase implements GetSubjectUsecase {
  private readonly subjectDAO: SubjectDAO;

  public constructor(deps: DAOGetSubjectUsecase.Deps) {
    this.subjectDAO = deps.subjectDAO;
  }

  public async execute(id: string): Promise<SubjectModel | null> {
    const subjectDTO = await this.subjectDAO.read(id);

    return subjectDTO ? SubjectHydrator.hydrate(subjectDTO) : null;
  }
}

export namespace DAOGetSubjectUsecase {
  export type Deps = {
    subjectDAO: SubjectDAO;
  };
}
