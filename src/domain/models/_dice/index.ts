import { vector } from '@domain/types';

import { Model, PlayerModel } from '..';

export interface DiceModel extends Model {
  sides: number;
  value: number | null;
  position: vector | null;
  ownerID: PlayerModel['id'] | null;
}
