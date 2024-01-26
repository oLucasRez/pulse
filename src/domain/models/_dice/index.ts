import { vector } from '@domain/types';

import { Model } from '..';

export interface DiceModel extends Model {
  sides: number;
  value: number | null;
  position: vector | null;
  ownerID: string | null;
}
