import { PlayerModel } from '@domain/models';

export interface SetPlayerDiceUsecase {
  execute(id: string, diceID: string): Promise<PlayerModel>;
}
