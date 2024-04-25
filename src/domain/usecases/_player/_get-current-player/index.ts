import { PlayerModel } from '@domain/models';

export interface IGetCurrentPlayerUsecase {
  execute(): Promise<PlayerModel | null>;
}
