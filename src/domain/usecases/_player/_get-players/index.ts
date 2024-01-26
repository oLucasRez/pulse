import { PlayerModel } from '@domain/models';

export interface GetPlayersUsecase {
  execute(): Promise<PlayerModel[]>;
}
