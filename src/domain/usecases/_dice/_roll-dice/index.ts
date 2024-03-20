import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface RollDiceUsecase {
  execute(id: string, position?: Vector): Promise<DiceModel>;
}
