import { PlayerModel } from '@domain/models';

export interface ISetPlayerSubjectUsecase {
  execute(subjectID: string): Promise<PlayerModel>;
}
