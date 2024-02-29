import { SubjectModel } from '@domain/models';

import { SubjectHydrator } from '@data/hydration';

import { GetMyPlayerUsecase, GetMySubjectUsecase } from '@domain/usecases';

import { SubjectCRUD } from '@data/cruds';

export class CRUDGetMySubjectUsecase implements GetMySubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly subjectCRUD: SubjectCRUD;

  public constructor(deps: CRUDGetMySubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.subjectCRUD = deps.subjectCRUD;
  }

  public async execute(): Promise<SubjectModel | null> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer?.subject) return null;

    const subjectDTO = (await this.subjectCRUD.read()).find(
      (subject) => subject.id === myPlayer.subject?.id,
    );

    return subjectDTO ? SubjectHydrator.hydrate(subjectDTO) : null;
  }
}

export namespace CRUDGetMySubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    subjectCRUD: SubjectCRUD;
  };
}
