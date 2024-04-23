import { DiceModel } from '@domain/models';

export interface IRollCurrentDiceUsecase {
  execute(): Promise<DiceModel>;
}
