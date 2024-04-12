import { DiceModel } from '@domain/models';

export interface IRollDiceUsecase {
  execute(id: string): Promise<DiceModel>;
}
