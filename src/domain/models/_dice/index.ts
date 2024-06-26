import { Color } from '@domain/enums';
import { Vector } from '@domain/utils';

import { Model, PlayerModel } from '..';

export interface DiceModel extends Model {
  sides: number;
  value: number | null;
  position: Vector | null;
  color: Color | null;
  order: number;
  overloadCount: number;
  overloaded: boolean;
  ownerID: PlayerModel['id'] | null;
}

export namespace DiceModel {
  export interface DTO extends Model.DTO {
    sides: number;
    value: number | null;
    position: Vector | null;
    order: number;
    overloadCount: number;
    overloaded: boolean;
  }
}
