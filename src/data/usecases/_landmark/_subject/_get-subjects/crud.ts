import { SubjectModel } from '@domain/models';

import { SubjectHydrator } from '@data/hydration';

import { GetSubjectsUsecase } from '@domain/usecases';

import { SubjectCRUD } from '@data/cruds';

export class CRUDGetSubjectsUsecase implements GetSubjectsUsecase {
  private readonly subjectCRUD: SubjectCRUD;

  public constructor(deps: CRUDGetSubjectsUsecase.Deps) {
    this.subjectCRUD = deps.subjectCRUD;
  }

  public async execute(): Promise<SubjectModel[]> {
    const subjectDTOs = await this.subjectCRUD.read();

    return subjectDTOs.map(SubjectHydrator.hydrate);
  }
}

export namespace CRUDGetSubjectsUsecase {
  export type Deps = {
    subjectCRUD: SubjectCRUD;
  };
}
