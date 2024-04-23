import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface IRollCurrentLightSpotDiceUsecase {
  execute(position: Vector): Promise<DiceModel>;
}
