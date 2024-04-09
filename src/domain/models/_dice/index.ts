import { Vector } from '@domain/utils';

import { Model, PlayerModel } from '..';

export interface DiceModel extends Model {
  sides: number;
  value: number | null;
  position: Vector | null;
  ownerID: PlayerModel['id'] | null;
}

export namespace DiceModel {
  export interface DTO extends Model.DTO {
    sides: number;
    value: number | null;
    position: Vector.JSON | null;
    ownerID: string | null;
  }
}
