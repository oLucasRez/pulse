import { PlayerModel } from '@domain/models';

export interface ISetPlayerDiceUsecase {
  execute(id: string, diceID: string): Promise<PlayerModel>;
}
