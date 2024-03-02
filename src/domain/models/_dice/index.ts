import { Vector } from '@domain/utils';

import { Model, PlayerModel } from '..';

export interface DiceModel extends Model {
  sides: number;
  value: number | null;
  position: Vector | null;
  ownerID: PlayerModel['id'] | null;
}
