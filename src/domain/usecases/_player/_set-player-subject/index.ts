import { PlayerModel } from '@domain/models';

export interface SetPlayerSubjectUsecase {
  execute(subjectID: string): Promise<PlayerModel>;
}
