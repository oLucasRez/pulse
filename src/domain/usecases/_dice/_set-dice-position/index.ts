import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface ISetDicePositionUsecase {
  execute(id: string, position: Vector | null): Promise<DiceModel>;
}
