import { SubjectModel } from '@domain/models';

import { SubjectHydrator } from '@data/hydration';

import { GetSubjectUsecase } from '@domain/usecases';

import { SubjectCRUD } from '@data/cruds';

export class CRUDGetSubjectUsecase implements GetSubjectUsecase {
  private readonly subjectCRUD: SubjectCRUD;

  public constructor(deps: CRUDGetSubjectUsecase.Deps) {
    this.subjectCRUD = deps.subjectCRUD;
  }

  public async execute(id: string): Promise<SubjectModel | null> {
    const subjectDTO = await this.subjectCRUD.read(id);

    return subjectDTO ? SubjectHydrator.hydrate(subjectDTO) : null;
  }
}

export namespace CRUDGetSubjectUsecase {
  export type Deps = {
    subjectCRUD: SubjectCRUD;
  };
}
